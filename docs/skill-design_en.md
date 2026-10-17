# SKILLS.md Design — the contract speaks standard, the body speaks vernacular

This document explains **why this repository allows SKILLS.md files written in dialect, workplace slang, and colloquial language ("vernacular")**, and how the mechanism works. It describes the thinking behind the implementation (`tools/lint-skills.mjs`) and the template (`skills/_TEMPLATE/SKILLS.md`).

## Background — why this design, why now

AI is increasingly able to handle many languages and many voices as-is. Homegrown Japanese LLMs in particular market their "understanding of the complex nuances of Japanese and of Japan-specific culture and customs."

- Example: **Sarashina (更科)** — a homegrown LLM by SB Intuitions (a SoftBank subsidiary), strong in Japanese and designed with Japan-specific culture and customs in mind. A free beta of its chat/API was released in October 2026, alongside models such as `embedding` / `rerank` / `translate` / `guard` ([Sarashina API](https://www.softbank.jp/business/service/ai/sarashina-api), [announcement](https://www.sbintuitions.co.jp/news/press/20261013_01/)).

Against this backdrop, the premise that "everything must first be normalized into English or standard language before being handed to AI" weakens. **The language of the field is itself an asset** carrying context and value. Even if it is somewhat dialectal, as long as the AI and colleagues can reach the meaning, it stands as a valid SKILLS.md.

> Vernacular: the language of a place or a team — dialects, colloquialisms, and internal slang. Here it is treated not as something to normalize away, but as something to preserve.

## The three-layer model

Think of a SKILLS.md in three layers. The key principle: **standardize only the layer of meaning; do not take away the surface form.**

| Layer | Role | What goes here | Strictness |
| --- | --- | --- | --- |
| **A. Contract** | Machine-readable part tools/agents read | frontmatter keys and values (`name`, `category`, `scope`, …) | **Strict** (canonical keys only) |
| **B. Body** | The author's own words | sections such as "when to use", "how to proceed" | **Free** (dialect is fine) |
| **C. Bridge** | Translates B for machines/others/other languages | `description`, "word mapping", GLOSSARY.md | **Required** (decodability) |

- Layer A is normalized (keys are fixed; otherwise tooling breaks).
- Layer B respects the writer's voice (no need to rewrite into standard language).
- Layer C guarantees only that the meaning can be reached. **Vernacular is valid only when it is decodable.**

## The mechanism

### 1. Intent anchors — make dialect headings machine-readable

Validation is by *intent*, not by surface text. When you use a dialectal heading, add an intent anchor at the end.

```md
## When to use {#when}          ← standard; aliases also match
## どないな時に使うん {#when}     ← dialect; the anchor states the intent
```

Available intents: `{#when}` `{#policy}` `{#steps}` `{#checklist}` `{#gloss}` `{#refs}`.

Standard and common colloquial headings (e.g. いつ使うか / 進めかた / 確認項目) match automatically via aliases. Fully dialectal headings bridge over with an anchor.

### 2. scope — change strictness by sharing range

`scope` says how far a skill is shared, and sets how strict the machine validation is.

| scope | Intended for | Validation |
| --- | --- | --- |
| `team` | Inside a team | missing items → **warn** (prioritize the field's language) |
| `project` | Inside a project | missing items → **warn** |
| `shared` | Broadly shared | missing required intents → **error** |
| `canonical` | Standard / foundational | plus "references" required, empty checklist is an error |

We do not measure every skill with the same ruler. **Fields that fully allow vernacular** and **shared skills that follow the form** coexist.

### 3. lang / variety — language metadata

```yaml
lang: ja            # ja, en, ja-kansai, ... (the language used)
variety: Kansai-ben  # optional; name of the dialect/slang
```

A skill whose `lang` carries a regional variant (`ja-kansai`, etc.) or that has a `variety` is treated as "has dialect," and layer C requires decodability.

### 4. GLOSSARY and "word mapping" — guaranteeing decodability

- **Words used only in one skill** → write them in that skill's `## Word mapping {#gloss}`
- **Words used by two or more skills** → collect them in the root [`GLOSSARY.md`](../GLOSSARY.md)

You do not need to rewrite vernacular into standard language. Just **keep the mapping (the meaning)**, and both AI and non-native readers can reach it.

## Using the linter

```bash
node tools/lint-skills.mjs            # validate
node tools/lint-skills.mjs --strict   # treat warnings as errors
node tools/lint-skills.mjs --json     # machine-readable (RAG / CI)
```

Validation runs per layer.

- **Layer A (strict)**: required keys; `name` = directory name; `category` = parent directory; `scope`/`category` enums; `version` is semver; `updated` is an ISO date.
- **Layer B (intent-based)**: presence of required intents by scope; recommended heading order; notes on headings with no recognized intent.
- **Layer C (decodability)**: `description` length; content of checklist/steps; presence of a gloss when dialectal; freshness (days since `reviewed`).

## Relationship to homegrown LLMs

Separating the layers lines up naturally with homegrown LLM features.

- `lang` / `variety` → use `embedding` / `rerank` to search and filter "skills in this dialect"
- `GLOSSARY.md` → decode vernacular as RAG material
- Intent anchors → structure stays stable even when the surface text is dialectal (friendlier to smaller models)
- `translate` → auto-generate a standard `description` from a dialectal body (automating layer C)
- `guard` → safety classification of input text

"Preserving vernacular while nurturing it" maximizes the strengths of homegrown LLMs that are strong in Japanese and Japanese culture.

## Workflow

1. Copy the template (`skills/_TEMPLATE/SKILLS.md`)
2. Fill in layer A (frontmatter). Consider `lang` and `scope` mandatory
3. Write layer B in your own words. Add intent anchors to dialectal headings
4. Add hard-to-follow words to "word mapping" or the GLOSSARY
5. Validate with `node tools/lint-skills.mjs` and refresh the index with `node tools/build-manifest.mjs`

## References

- [`GLOSSARY.md`](../GLOSSARY.md) — the word mapping
- [`skills/_TEMPLATE/SKILLS.md`](../skills/_TEMPLATE/SKILLS.md) — skill template
- [`tools/lint-skills.mjs`](../tools/lint-skills.mjs) — validation tool
- [Sarashina API (SoftBank)](https://www.softbank.jp/business/service/ai/sarashina-api)
- [Sarashina free beta (SB Intuitions)](https://www.sbintuitions.co.jp/news/press/20261013_01/)
