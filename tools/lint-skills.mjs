#!/usr/bin/env node
// SKILLS.md linter — 3層モデル（A: 契約 / B: 本文の意図 / C: 解読可能性）で検証する。
//
//   A層: frontmatter のキー・enum・命名・日付は厳格に検証（表記が違っても直す）
//   B層: 見出しは「字面一致」ではなく「意図一致」で検証（方言の見出しを許容）
//   C層: 方言・社内語が意味に到達できるか（description / 「ことばの対応」/ GLOSSARY）を検証
//
// 厳格度は scope で変わる:
//   team / project  -> 不足は warn（現場の言葉を優先）
//   shared          -> 必須意図の不足は error
//   canonical       -> 上に加えて 参考 も必須、チェックリスト空は error
//
// 使い方:
//   node tools/lint-skills.mjs            # 検証
//   node tools/lint-skills.mjs --strict   # warn も error 扱い
//   node tools/lint-skills.mjs --json     # 機械可読（RAG/CI 連携用）

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const skillsDir = join(repoRoot, "skills");
const ARGS = process.argv.slice(2);
const STRICT = ARGS.includes("--strict");
const JSON_OUT = ARGS.includes("--json");
const FRESH_DAYS = 180;

const CATEGORIES = ["usage", "language", "markup", "environment", "others"];
const SCOPES = ["team", "project", "shared", "canonical"];

// 意図 → 許容する見出しの別名（日本語・口語・英語）。順序は本文の推奨順。
const INTENTS = [
  { id: "when", required: ["shared", "canonical"],
    aliases: ["いつ使うか", "いつ使う", "使いどき", "どんな時", "どんなとき", "使うとき", "発動条件", "when to use", "use when", "situation"] },
  { id: "policy", required: ["shared", "canonical"],
    aliases: ["基本方針", "方針", "原則", "スタンス", "考え方", "policy", "principles"] },
  { id: "steps", required: ["shared", "canonical"],
    aliases: ["進め方", "手順", "やり方", "進めかた", "ステップ", "steps", "procedure", "workflow"] },
  { id: "checklist", required: ["shared", "canonical"],
    aliases: ["チェックリスト", "確認項目", "確認事項", "チェック", "checklist"] },
  { id: "gloss", required: [],
    aliases: ["ことばの対応", "用語集", "用語", "ことば", "glossary"] },
  { id: "refs", required: ["canonical"],
    aliases: ["参考", "参照", "関連", "リンク", "references", "see also"] },
];
const ORDER = INTENTS.map((i) => i.id);
const ORDER_INDEX = Object.fromEntries(ORDER.map((id, i) => [id, i]));

const INTENT_BY_ID = Object.fromEntries(INTENTS.map((i) => [i.id, i]));

function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return { data: {}, body: text, hasFrontmatter: false };
  const data = {};
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1).split(",").map((v) => v.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }
    data[key] = value;
  }
  return { data, body: text.slice(match[0].length), hasFrontmatter: true };
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === "_TEMPLATE") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry === "SKILLS.md") out.push(full);
  }
  return out;
}

function normalizeHeading(heading) {
  return heading
    .replace(/^#+\s*/, "")
    .replace(/\{#[a-z0-9_-]+\}/gi, "")
    .replace(/[*`_]/g, "")
    .replace(/[\s\u3000]/g, "")
    .replace(/[：:.。、,，+＋\-–—/／|｜]/g, "")
    .toLowerCase();
}

function intentOf(heading) {
  const anchor = /\{#([a-z0-9_-]+)\}/i.exec(heading);
  if (anchor) return anchor[1].toLowerCase();
  const norm = normalizeHeading(heading);
  for (const intent of INTENTS) {
    for (const alias of intent.aliases) {
      if (norm.includes(alias.toLowerCase())) return intent.id;
    }
  }
  return null;
}

function isIsoDate(v) {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
}
function daysSince(v) {
  const t = Date.parse(v);
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / 86400000);
}
function isSemver(v) {
  return typeof v === "string" && /^\d+\.\d+\.\d+(?:[-+].+)?$/.test(v);
}

function lintFile(file) {
  const issues = [];
  const err = (msg) => issues.push({ level: "error", msg });
  const warn = (msg) => issues.push({ level: "warn", msg });

  const rel = relative(repoRoot, file).split("\\").join("/");
  const parts = rel.split("/");
  const dirCategory = parts[1];
  const dirName = parts[parts.length - 2];

  const text = readFileSync(file, "utf8");
  const { data: fm, body, hasFrontmatter } = parseFrontmatter(text);

  // ---------- A層: 契約（厳格） ----------
  if (!hasFrontmatter) err("frontmatter (---) がありません");

  const requiredKeys = ["name", "description", "category", "tags", "version", "updated"];
  for (const k of requiredKeys) {
    if (!(k in fm)) err(`A層: 必須キー '${k}' がありません`);
  }
  for (const k of ["lang", "scope"]) {
    if (!(k in fm)) warn(`A層: 推奨キー '${k}' がありません（方言・共有範囲の管理に必要）`);
  }

  if (fm.name && fm.name !== dirName) err(`A層: name '${fm.name}' がディレクトリ名 '${dirName}' と一致しません`);
  if (fm.name && !/^[a-z0-9][a-z0-9-]*$/.test(fm.name)) warn(`A層: name は英小文字ケバブケース推奨: '${fm.name}'`);
  if (fm.category && !CATEGORIES.includes(fm.category)) err(`A層: category '${fm.category}' は ${CATEGORIES.join(" | ")} のいずれか`);
  if (fm.category && fm.category !== dirCategory) err(`A層: category '${fm.category}' が親ディレクトリ '${dirCategory}' と一致しません`);
  if (fm.version && !isSemver(fm.version)) err(`A層: version '${fm.version}' が semver ではありません`);
  if (fm.updated && !isIsoDate(fm.updated)) err(`A層: updated '${fm.updated}' が YYYY-MM-DD ではありません`);
  if (fm.reviewed && !isIsoDate(fm.reviewed)) err(`A層: reviewed '${fm.reviewed}' が YYYY-MM-DD ではありません`);

  const scope = fm.scope || "team";
  if (fm.scope && !SCOPES.includes(fm.scope)) err(`A層: scope '${fm.scope}' は ${SCOPES.join(" | ")} のいずれか`);

  const tags = Array.isArray(fm.tags) ? fm.tags : [];
  if (tags.length < 1) warn("A層: tags が空です（検索・絞り込みに推奨）");
  if (tags.length > 8) warn(`A層: tags が多すぎます (${tags.length})`);
  for (const t of tags) if (/[A-Z\s]/.test(t)) warn(`A層: tag '${t}' は英小文字・空白なし推奨`);

  const desc = fm.description || "";
  if (desc.length < 30) warn(`C層: description が短すぎます (${desc.length})（発動判断の手がかりになる）`);
  if (desc.length > 200) warn(`C層: description が長すぎます (${desc.length})`);

  // ---------- B層: 見出しの意図（方言を許容） ----------
  const headings = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]);
  const foundIntents = [];
  for (const h of headings) {
    const id = intentOf(h);
    if (id && INTENT_BY_ID[id] && !foundIntents.includes(id)) foundIntents.push(id);
  }
  const unknown = headings.filter((h) => !intentOf(h));

  for (const intent of INTENTS) {
    if (intent.required.includes(scope) && !foundIntents.includes(intent.id)) {
      const level = scope === "canonical" || scope === "shared" ? "error" : "warn";
      (level === "error" ? err : warn)(`B層: 必須の意図 '${intent.id}' に対応する見出しがありません（例: ${intent.aliases.slice(0, 3).join(" / ")}）`);
    }
  }

  const seq = foundIntents.map((id) => ORDER_INDEX[id]).filter((n) => n != null);
  const sorted = [...seq].sort((a, b) => a - b);
  if (seq.join(",") !== sorted.join(",")) warn(`B層: 見出しの順序が推奨 (${ORDER.join(" → ")}) と異なります`);

  if (unknown.length) warn(`B層: 意図に対応しない見出し: ${unknown.map((u) => `'${u}'`).join(", ")}（意図アンカー {#when} 等で明示できます）`);

  // ---------- チェックリスト / 進め方 の中身 ----------
  const checklistItems = (body.match(/^\s*[-*]\s*\[[ xX]\]/gm) || []).length;
  if (foundIntents.includes("checklist") && checklistItems === 0) {
    (scope === "canonical" ? err : warn)("C層: チェックリストに項目 (- [ ]) がありません");
  }
  const stepItems = (body.match(/^\s*\d+[.)]/gm) || []).length;
  if (foundIntents.includes("steps") && stepItems === 0) warn("C層: 進め方に番号付き手順がありません");

  // ---------- C層: 解読可能性（方言を許容する条件） ----------
  const isDialect = Boolean(fm.variety) || /^[a-z]{2,3}[-_]/.test(fm.lang || "");
  const hasGloss = foundIntents.includes("gloss");
  const refsText = fm.reference || fm.refs || "";
  const mentionsGlossary = /GLOSSARY/i.test(body) || /GLOSSARY/i.test(String(refsText));
  if (isDialect && !hasGloss && !mentionsGlossary) {
    warn("C層: 方言/社内語 (lang に地域差 or variety) がありますが『ことばの対応』も GLOSSARY 参照もありません");
  }

  // ---------- 鮮度 ----------
  const freshBase = fm.reviewed || fm.updated;
  if (isIsoDate(freshBase)) {
    const d = daysSince(freshBase);
    if (d != null && d > FRESH_DAYS) warn(`鮮度: 最終更新/レビューから ${d} 日経過（再レビュー推奨）`);
  }

  const level = issues.some((i) => i.level === "error") ? "error"
    : issues.some((i) => i.level === "warn") ? "warn" : "ok";
  return { rel, scope, level, issues, name: fm.name || dirName };
}

const files = walk(skillsDir).sort();
const results = files.map(lintFile);

if (JSON_OUT) {
  const total = results.length;
  const errors = results.filter((r) => r.level === "error").length;
  const warns = results.filter((r) => (STRICT ? r.level !== "ok" : r.level === "warn")).length;
  console.log(JSON.stringify({ total, errors, warns, results }, null, 2));
  process.exit(results.some((r) => r.level === "error") ? 1 : 0);
}

const C = { error: "\x1b[31m", warn: "\x1b[33m", ok: "\x1b[32m", dim: "\x1b[2m", reset: "\x1b[0m" };
const LABEL = STRICT ? "\x1b[31mERR\x1b[0m" : "\x1b[33mWRN\x1b[0m";
let errorCount = 0;
let warnCount = 0;

for (const r of results) {
  if (!r.issues.length) continue;
  const hasError = r.issues.some((i) => i.level === "error");
  if (hasError) errorCount++;
  else warnCount++;
  console.log(`\n${C.dim}${r.rel}${C.reset} ${C.dim}[scope: ${r.scope}]${C.reset}`);
  for (const i of r.issues) {
    const isErr = i.level === "error";
    console.log(`  ${isErr ? C.error + "error" : C.warn + "warn "}${C.reset} ${i.msg}`);
  }
}

const clean = results.filter((r) => !r.issues.length).length;
console.log(
  `\n${results.length} skills — ${C.ok}${clean} ok${C.reset}, ` +
  `${errorCount ? C.error : C.dim}${errorCount} with errors${C.reset}, ` +
  `${warnCount ? C.warn : C.dim}${warnCount} with warnings${C.reset}`
);

const failed = errorCount > 0 || (STRICT && warnCount > 0);
if (failed) {
  console.log(`\n${LABEL} lint ${STRICT ? "(strict) " : ""}failed`);
  process.exit(1);
}
console.log(`\n${C.ok}lint passed${C.reset}`);
