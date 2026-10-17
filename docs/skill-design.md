# SKILLS.md の設計方針 — 契約は標準語、本文は土語

このドキュメントは、なぜこのリポジトリが **方言・社内語・口語（＝土語）で書かれた SKILLS.md を許容する**のか、その理由と仕組みをまとめたものです。実装（`tools/lint-skills.mjs`）とテンプレート（`skills/_TEMPLATE/SKILLS.md`）の背後にある考え方を説明します。

## 背景 — なぜ今この設計なのか

AI が多言語・多声をそのまま扱えるようになりつつあります。特に国産 LLM は「日本語の複雑なニュアンスや、日本特有の文化・慣習への理解」を特徴として掲げています。

- 例: **更科（Sarashina）** — SB Intuitions（ソフトバンク傘下）が開発した国産 LLM。日本語に強く、日本特有の文化・慣習を考慮した応答をうたう。2026年10月にはチャット/API の無償ベータが公開され、`embedding` / `rerank` / `translate` / `guard` といったモデルも提供される（[Sarashina API](https://www.softbank.jp/business/service/ai/sarashina-api)、[サービス発表](https://www.sbintuitions.co.jp/news/press/20261013_01/)）。

この流れの中で、「一度すべて英語や標準語に正規化してから AI に渡す」という前提は弱まります。**現場のことばは、それ自体が文脈と価値を持った資産**です。多少方言であっても、AI と同僚が意味に到達できれば、SKILLS.md として十分に成立します。

> 土語（どご）: その土地・現場のことば。方言や口語、社内スラングを含む。ここでは「正規化の対象」ではなく「活かす対象」として扱う。

## 3層モデル

SKILLS.md を3つの層に分けて考えます。ポイントは **意味の層だけ標準化し、表記は手放さない** こと。

| 層 | 役割 | 何を書くか | 厳格度 |
| --- | --- | --- | --- |
| **A. 契約** | ツール・エージェントが読む機械可読部 | frontmatter のキーと値（`name` `category` `scope` など） | **厳格**（正規キーのみ） |
| **B. 本文** | 著者のことば | 「いつ使うか」「進め方」などの本文 | **自由**（方言 OK） |
| **C. 橋渡し** | B を機械・他者・他言語へ翻訳 | `description`、「ことばの対応」、GLOSSARY.md | **必須**（解読可能性） |

- A層は正規化します（キー名は固定。さもないと道具が壊れる）。
- B層は書き手の言葉を尊重します（標準語へ直す必要はない）。
- C層で「意味に到達できるか」だけを担保します。**土語は、解読可能なときだけ有効**です。

## 仕組み

### 1. 意図アンカー — 方言の見出しを機械可読にする

見出しの字面ではなく「意図」で検証します。方言の見出しを使うときは、末尾に意図アンカーを付けます。

```md
## いつ使うか {#when}          ← 標準語。エイリアスでも一致
## どないな時に使うん {#when}   ← 方言。アンカーで意図を明示
```

用意している意図: `{#when}` `{#policy}` `{#steps}` `{#checklist}` `{#gloss}` `{#refs}`。

標準語・よくある口語（いつ使うか／進めかた／確認項目 など）はエイリアスで自動的に一致します。全面方言の見出しは、アンカーで橋を架けます。

### 2. scope — 共有範囲で厳格度を変える

`scope` は「そのスキルをどこまで共有するか」を表し、機械検証の厳しさを決めます。

| scope | 想定 | 検証 |
| --- | --- | --- |
| `team` | チーム内だけ | 不足は **warn**（現場のことばを優先） |
| `project` | プロジェクト内 | 不足は **warn** |
| `shared` | 広く共有 | 必須意図の不足は **error** |
| `canonical` | 標準・基盤 | 上に加えて「参考」も必須、チェックリスト空は error |

同じ厳しさで全スキルを測りません。**土語を全力で許す現場**と、**型を守る共有スキル**を同居させます。

### 3. lang / variety — ことばのメタデータ

```yaml
lang: ja            # ja, en, ja-kansai, ... （使うことば）
variety: 関西弁      # 任意。方言・社内語の名前
```

`lang` に地域差（`ja-kansai` など）がある、または `variety` があるスキルは「方言あり」と判定し、C層で解読可能性を要求します。

### 4. GLOSSARY と「ことばの対応」 — 解読可能性の担保

- **そのスキル内だけの語** → そのスキルの `## ことばの対応 {#gloss}` に書く
- **2つ以上のスキルで使う語** → ルートの [`GLOSSARY.md`](../GLOSSARY.md) に集約

土語を標準語に直す必要はありません。**対応づけ（意味）を残す**だけで、AI も非ネイティブも意味に到達できます。

## lint の使い方

```bash
node tools/lint-skills.mjs            # 検証
node tools/lint-skills.mjs --strict   # warn も error として扱う
node tools/lint-skills.mjs --json     # 機械可読（RAG / CI 連携用）
```

検証は層ごとに行われます。

- **A層（厳格）**: 必須キー、`name`＝ディレクトリ名、`category`＝親ディレクトリ、`scope`/`category` の enum、`version` は semver、`updated` は ISO 日付。
- **B層（意図ベース）**: scope に応じた必須意図の有無、見出しの推奨順序、意図不明の見出しへの注意。
- **C層（解読可能性）**: `description` の長さ、チェックリスト／手順の中身、方言時の gloss 有無、鮮度（`reviewed` からの経過日数）。

## 国産 LLM との関係

分離しておくと、国産 LLM の機能と素直に噛み合います。

- `lang` / `variety` → `embedding` / `rerank` で「この方言のスキル」を検索・絞り込み
- `GLOSSARY.md` → RAG の材料として土語をデコード
- 意図アンカー → 表記が方言でも構造が安定（小型モデルに優しい）
- `translate` → 方言本文から標準の `description` を自動生成（C層の自動化）
- `guard` → 入力テキストの安全性判定

「土語を捨てずに育てる」ことが、日本語・日本文化に強い国産 LLM の強みを最大化します。

## 運用フロー

1. テンプレート（`skills/_TEMPLATE/SKILLS.md`）をコピーする
2. A層（frontmatter）を埋める。`lang` と `scope` は必須で考える
3. B層は自分のことばで書く。方言の見出しには意図アンカーを付ける
4. 通じにくい語は「ことばの対応」か GLOSSARY に足す
5. `node tools/lint-skills.mjs` で検証し、`node tools/build-manifest.mjs` で索引を更新する

## 参考

- [`GLOSSARY.md`](../GLOSSARY.md) — ことばの対応表
- [`skills/_TEMPLATE/SKILLS.md`](../skills/_TEMPLATE/SKILLS.md) — スキル雛形
- [`tools/lint-skills.mjs`](../tools/lint-skills.mjs) — 検証ツール
- [Sarashina API（ソフトバンク）](https://www.softbank.jp/business/service/ai/sarashina-api)
- [Sarashina サービス無償ベータ（SB Intuitions）](https://www.sbintuitions.co.jp/news/press/20261013_01/)
