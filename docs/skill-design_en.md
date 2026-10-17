# SKILLS.md Design — the contract speaks standard, the body speaks vernacular

This document explains **why this repository allows SKILLS.md files written in dialect, workplace slang, and colloquial language ("vernacular")**, and how the mechanism works. It describes the thinking behind the implementation (`tools/lint-skills.mjs`) and the template (`skills/_TEMPLATE/SKILLS.md`).

## Background — why this design, why now

AI is increasingly able to handle many languages and many voices as-is. Homegrown Japanese LLMs in particular market their "understanding of the complex nuances of Japanese and of Japan-specific culture and customs."

- Example: **Sarashina (更科)** — a homegrown LLM by SB Intuitions (a SoftBank subsidiary), strong in Japanese and designed with Japan-specific culture and customs in mind. A free beta of its chat/API was released in October 2026, alongside models such as `embedding` / `rerank` / `translate` / `guard` ([Sarashina API](https://www.softbank.jp/business/service/ai/sarashina-api), [announcement](https://www.sbintuitions.co.jp/news/press/20261013_01/)).

Against this backdrop, the premise that "everything must first be normalized into English or standard language before being handed to AI" weakens. **The language of the field is itself an asset** carrying context and value. Even if it is somewhat dialectal, as long as the AI and colleagues can reach the meaning, it stands as a valid SKILLS.md.

> Vernacular: the language of a place or a team — dialects, colloquialisms, and internal slang. Here it is treated not as something to normalize away, but as something to preserve.

## Why this repository exists — matching Japanese and computing

The question at the root is **how to mesh the properties of Japanese as a natural language with computing** (tools, types, search, LLMs). This is the very reason this repository exists.

- Japanese has strong word order, inflection, honorifics, dialects, ellipsis, and context dependence, which sit poorly with English-first normalization and surface-string matching.
- So we make only the layer of meaning machine-readable (frontmatter, intent anchors, word mapping) and keep the surface form.
- The three-layer model, intent anchors, and GLOSSARY are attempts to improve that mesh — not a finished form.

Good ways to match the two are still being explored. This repository exists as a place to bring together experiments and findings.

## Overcoming "SKILLS for SKILLS"

This repository holds both the SKILLS.md files that carry skills and the meta layer that defines how to make them (design notes, template, linter). Left alone, it closes into a self-referential loop: "SKILLS.md for writing SKILLS.md." We overcome it not by escaping, but by **turning the loop into an open circuit**.

1. **Asymmetry of layers — keep the meta layer thin**: hold the meta layer to the minimal core that defines "how to make them," and let the content layer (usage / language / markup / environment / apple / others) address external domains broadly. Do not grow the meta layer; keep it thin and let it not crowd out the content.
2. **Point meaning outward**: the contract is standard, the body is vernacular, and the bridge (word mapping) guarantees "the reader — human or AI — can reach the meaning." Meaning always points to the outside reader and the field, never to the skill itself.
3. **Validate by transplanting to the field**: value is measured when a skill is transplanted into a real project and used on real tasks. Run the adopt → review → update loop, and decide truth by outside results rather than self-description. The seedling box is not the field.
4. **Impose an exit condition**: each skill must target real work other than "writing SKILLS.md" and must stand alone. Do not add meta-only skills.

Keep the meta layer minimal and bounded, then open meaning and validation to the outside (the field). That is the policy for not closing into self-reference.

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

Available intents: `{#when}` `{#policy}` `{#steps}` `{#walkthrough}` `{#examples}` `{#checklist}` `{#gloss}` `{#refs}`. `{#walkthrough}` (screen steps) and `{#examples}` (script examples) are optional and add depth to skills that involve UI operations or code.

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

**"Word mapping"** is the section that maps words appearing in a SKILLS.md body to a canonical meaning that still reads outside its original context (the core of layer C — the bridge). It does not rewrite into standard language; it **keeps the mapping between word and meaning** so readers (colleagues, other teams, AI) can reach the meaning.

Where it goes depends on the sharing range.

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

## The PDCA cycle and how this repository applies it

The work of this repository can be read either as the seedling-box cycle (sow → raise → thin → transplant) or as PDCA. In PDCA terms:

| Stage | General idea | Use in this repository |
| --- | --- | --- |
| **Plan** | Decide the purpose, subject, and scope | Set the subject and sharing range in the `_TEMPLATE/SKILLS.md` frontmatter (`description` / `scope` / `tags` / `version`) |
| **Do** | Do the work | Write `skills/<axis>/<skill-name>/SKILLS.md` in three layers (contract / body / bridge). Attach intent anchors to dialectal headings |
| **Check** | Verify | Validate layers A/B/C with `node tools/lint-skills.mjs` (`--strict` / `--json`), review via PR / Issue, and check freshness (180 days since `reviewed`) |
| **Act** | Improve and settle | Update `version` / `updated`, de-duplicate, and regenerate the index with `node tools/build-manifest.mjs`. Transplant a skill into a project and feed the real-task adoption results back into the next Plan |

**The PDCA of this repository does not close.** Plan–Check run inside the box (the repository), but the real validation of **Act happens in the field (transplanting into a real project and actual use)**, and its results return to the next Plan. This cycle is the substance of the open circuit that overcomes "SKILLS for SKILLS."

## References

- [`GLOSSARY.md`](../GLOSSARY.md) — the word mapping
- [`skills/_TEMPLATE/SKILLS.md`](../skills/_TEMPLATE/SKILLS.md) — skill template
- [`tools/lint-skills.mjs`](../tools/lint-skills.mjs) — validation tool
- [Sarashina API (SoftBank)](https://www.softbank.jp/business/service/ai/sarashina-api)
- [Sarashina free beta (SB Intuitions)](https://www.sbintuitions.co.jp/news/press/20261013_01/)
