#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const skillsDir = join(repoRoot, "skills");
const collectionsDir = join(repoRoot, "collections");
const outFile = join(skillsDir, "manifest.json");

const CATEGORY_LABELS = {
  usage: "開発用途別",
  language: "プログラミング言語別",
  markup: "マークアップ言語別",
  environment: "実行環境別",
  others: "その他",
};
const CATEGORY_ORDER = ["usage", "language", "markup", "environment", "others"];

function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return {};
  const data = {};
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }
    data[key] = value;
  }
  return data;
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

const byCategory = Object.fromEntries(CATEGORY_ORDER.map((c) => [c, []]));

for (const file of walk(skillsDir)) {
  const rel = relative(repoRoot, file).split("\\").join("/");
  const category = rel.split("/")[1];
  const fm = parseFrontmatter(readFileSync(file, "utf8"));
  if (!byCategory[category]) byCategory[category] = [];
  byCategory[category].push({
    name: fm.name || rel.split("/")[2],
    description: fm.description || "",
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    version: fm.version || "",
    updated: fm.updated || "",
    lang: fm.lang || "",
    scope: fm.scope || "",
    variety: fm.variety || "",
    path: rel,
  });
}

for (const list of Object.values(byCategory)) {
  list.sort((a, b) => a.name.localeCompare(b.name));
}

const skillByPath = {};
for (const list of Object.values(byCategory)) {
  for (const s of list) skillByPath[s.path] = s;
}

function readCollections() {
  let entries = [];
  try {
    entries = readdirSync(collectionsDir);
  } catch {
    return [];
  }
  const out = [];
  for (const entry of entries.sort()) {
    if (!entry.endsWith(".md")) continue;
    const full = join(collectionsDir, entry);
    if (!statSync(full).isFile()) continue;
    const rel = relative(repoRoot, full).split("\\").join("/");
    const fm = parseFrontmatter(readFileSync(full, "utf8"));
    const paths = Array.isArray(fm.skills) ? fm.skills : [];
    out.push({
      id: fm.name || entry.replace(/\.md$/, ""),
      label: fm.label || fm.name || entry.replace(/\.md$/, ""),
      description: fm.description || "",
      path: rel,
      skills: paths.map((p) => {
        const s = skillByPath[`skills/${p}/SKILLS.md`];
        return {
          path: p,
          name: s?.name || p.split("/").pop(),
          category: p.split("/")[0],
          description: s?.description || "",
        };
      }),
    });
  }
  return out;
}

const collections = readCollections();

const manifest = {
  generated: new Date().toISOString().slice(0, 10),
  editor: "https://right-stuff-editor.vercel.app/editor",
  rawBase: "https://cdn.jsdelivr.net/gh/watanabe3tipapa/skills-seedling@main/",
  categories: CATEGORY_ORDER.filter((c) => byCategory[c]?.length).map((id) => ({
    id,
    label: CATEGORY_LABELS[id] || id,
    skills: byCategory[id],
  })),
  collections,
};

writeFileSync(outFile, JSON.stringify(manifest, null, 2) + "\n");
const total = manifest.categories.reduce((n, c) => n + c.skills.length, 0);
console.log(`Wrote ${relative(repoRoot, outFile)} (${total} skills, ${collections.length} collections)`);
