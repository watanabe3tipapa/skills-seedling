# skills-seedling

**Skills are not collected — they are grown.**

skills-seedling is a curated repository that organizes **SKILLS.md** files for AI coding assistants by development use case, programming language, and runtime environment — grown to be readable by both agents and humans.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-v0.1.0-blue.svg)](https://github.com/watanabe3tipapa/skills-seedling/releases)
[![SKILLS.md](https://img.shields.io/badge/SKILLS.md-collection-4f46e5.svg)](#taxonomy)
[![GitHub](https://img.shields.io/github/issues/watanabe3tipapa/skills-seedling.svg)](https://github.com/watanabe3tipapa/skills-seedling/issues)

[English](README_en.md) | [日本語](README.md)

---

## Overview

skills-seedling is a collection that organizes SKILLS.md files along **six axes** (development use case / programming language / markup language / runtime environment / Apple ecosystem / other) so you can quickly find the skill definition you need for your goal or tech stack. Rather than treating skill definitions as a one-off copy source, it places them in a *growing* process — reviews and updates keep them fresh and reusable.

At its root, this repository asks **how to mesh the properties of Japanese as a natural language with computing** (tools, types, search, LLMs). The three-layer design — machine-readable only in the layer of meaning, surface form preserved — is an attempt to improve that match, not a finished form. Good approaches are still being explored, and this repository is a place to bring the findings together.

## Concept (why "seedling"?)

A seedling box is a small container that **guards and raises seeds until they are ready to be transplanted into the field**. skills-seedling works the same way: it grows skill definitions until they can be transplanted into your project's AI tools.

| Seedling-box activity | skills-seedling equivalent |
|---|---|
| Sow seeds | Write a SKILLS.md and share it via PR |
| Nurture in the box | Store it, organized by use case / language / environment |
| Water, thin, inspect | Update stale definitions, deduplicate, review |
| Keep growth records | Document the target, scope, and last-updated date |
| Two cotyledons open | Reachable from both the use-case axis and the language/environment axis |
| Transplant to the field | Place it in a project and load it into your AI tool |

## Features

- A taxonomy organized along six axes
- One concept per file at `skills/<axis>/<skill-name>/SKILLS.md`
- `skills/manifest.json` auto-generated for listing, search, and the launcher
- SKILLS.md files that can be handed straight to AI coding assistants (agents)
- Ready to use with copy & paste
- Open **Right-Stuff Editor** from a browser launcher to edit skills
- Curation via GitHub Pull Requests / Issues
- A dialect-tolerant, three-layer design with a validation tool (`tools/lint-skills.mjs`)
- A landing page (HTML) to see the whole collection at a glance

## Taxonomy

| Axis | Directory | Contents |
|---|---|---|
| By development use case | `skills/usage/` | Web development, backend, data analysis, infra / DevOps, etc. |
| By programming language | `skills/language/` | Python, TypeScript, Go, Rust, C / C++, JavaScript, R, COBOL, etc. |
| By markup language | `skills/markup/` | Markdown (.md), Quarto (.qmd), AsciiDoc, reStructuredText, HTML, LaTeX, Mermaid, etc. |
| By runtime environment | `skills/environment/` | Local development, cloud, SaaS integrations |
| By Apple ecosystem | `skills/apple/` | Apple Notes (basics, dictation, Siri, handwriting, automation, sync & security, etc.) |
| Other | `skills/others/` | Review, testing, security, documentation, etc. |

The index is generated into `skills/manifest.json` (`node tools/build-manifest.mjs`).

## Featured collections

Curated sets that bundle related skills across multiple axes around a purpose. One file per collection lives at `collections/<id>.md`, declaring its composition in the frontmatter `skills` list (skill paths). They are pulled into the manifest automatically under `collections`.

| Collection | Skills |
|---|---|
| Python feature | `language/python` + `usage/data-analysis` / `usage/machine-learning` / `usage/web-scraping` / `usage/backend-api` + `others/testing` / `others/prompt-engineering` |
| R feature | `language/r` + `markup/r-markdown` / `markup/quarto` + `usage/data-analysis` / `usage/machine-learning` |
| Apple Notes feature | 22 `apple/apple-notes-*` skills (basics / organize & search / dictation & Siri / handwriting / automation / attachments & scan / sharing, sync & security) |

If the taxonomy gives you points, featured collections give you a purpose-driven line.

## A dialect-tolerant design (growing vernacular)

SKILLS.md does not have to be normalized into English or standard language. **The contract speaks standard; the body speaks vernacular** — only the machine-readable part (frontmatter) is normalized, while the body keeps the writer's own language (dialect, slang, colloquial).

- **Layer A — contract**: frontmatter keys/values (`name`, `category`, `lang`, `scope`, …) — strict
- **Layer B — body**: sections such as "when to use" / "how to proceed" — free (dialect OK)
- **Layer C — bridge**: `description`, "word mapping", [`GLOSSARY.md`](GLOSSARY.md) — guaranteeing the meaning is reachable

"Word mapping" is the section that maps words in the body to canonical meanings. Words used only within a skill go in that skill's `## Word mapping {#gloss}`; words shared across skills go in [`GLOSSARY.md`](GLOSSARY.md).

Dialectal headings can be made machine-readable with intent anchors:

```md
## どないな時に使うん {#when}
```

`lang` (the language used), `variety` (the name of the dialect/slang), and `scope` (sharing range) tune how much is allowed. The broader the `scope`, the stricter the validation (`team` → warn, `shared` / `canonical` → error).

```bash
node tools/lint-skills.mjs            # validate
node tools/lint-skills.mjs --strict   # treat warnings as errors
```

See [docs/skill-design_en.md](docs/skill-design_en.md) for details, including how this fits homegrown Japanese LLMs (e.g. Sarashina).

## Usage

1. Choose a category that matches your goal — pick from use case, language, or runtime environment
2. Find the SKILLS.md you need — locate the definition that fits your project
3. Copy it into your project — download or copy the file and load it into your AI coding assistant's skill settings

## Edit in the editor (Right-Stuff Editor integration)

`editor.html` is a launcher for opening a skill in the editor. Pick a skill and press "Open in editor" to open [Right-Stuff Editor](https://right-stuff-editor.vercel.app/editor) in a new tab while copying the body Markdown to your clipboard. Paste it into the editor to start editing.

The launcher is a **PWA** (`manifest.webmanifest` + a Service Worker). On supported browsers it can be installed to the home screen / desktop, and once loaded, the skill list and bodies are cached so it launches offline.

> The launcher `fetch`es `skills/manifest.json` and the SKILLS.md files, so it does not work over `file://`. Serve it over HTTP (GitHub Pages, or a local server such as `npx serve`).

## Deploying to GitHub Pages

`index.html` (landing page) and `editor.html` (launcher) are a plain static site, so they can be published on GitHub Pages as-is. Deployment is automated with GitHub Actions (`.github/workflows/pages.yml`).

For the first run only, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. After that, every push to `main` publishes automatically (you can also trigger it manually via `workflow_dispatch` in the Actions tab).

```bash
git init -b main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/watanabe3tipapa/skills-seedling.git
git push -u origin main
```

The published URL is `https://watanabe3tipapa.github.io/skills-seedling/`.

> `docs/*.md` and `GLOSSARY.md` are served as raw Markdown on the static site (they render nicely on GitHub).

## Structure diagram

The repository layout and its six collections are summarized in a diagram. Open the HTML below to zoom, search, switch themes, and trace relationships.

- [Diagram (interactive HTML)](docs/repository-structure.html)
- Diagram source: [`docs/repository-structure.architecture.json`](docs/repository-structure.architecture.json)

## Repository layout

```text
.
├── README.md                    # Japanese
├── README_en.md                 # This file (English)
├── GLOSSARY.md                  # Word mapping (decoding vernacular)
├── LICENSE                      # MIT
├── VERSION                      # Repository version (v0.1.0)
├── index.html                   # Landing page
├── editor.html                  # Editor launcher (PWA)
├── manifest.webmanifest         # PWA manifest
├── sw.js                        # Service Worker
├── icons/                       # PWA icons (SVG + PNG)
├── docs/
│   ├── skill-design.md          # SKILLS.md design (Japanese)
│   ├── skill-design_en.md       # SKILLS.md design (English)
│   ├── repository-structure.html              # Structure diagram (interactive HTML)
│   └── repository-structure.architecture.json # Diagram source (Archify)
├── skills/
│   ├── manifest.json            # Auto-generated index
│   ├── _TEMPLATE/SKILLS.md      # Skill template
│   ├── usage/                   # By development use case
│   ├── language/                # By programming language
│   ├── markup/                  # By markup language
│   ├── environment/             # By runtime environment
│   ├── apple/                   # By Apple ecosystem (Apple Notes first)
│   └── others/                  # Other
├── collections/                 # Featured collections (cross-axis curation)
│   ├── python.md                # Python feature
│   ├── r.md                     # R feature
│   └── apple-notes.md           # Apple Notes feature
└── tools/
    ├── build-manifest.mjs       # Manifest generator
    └── lint-skills.mjs          # SKILLS.md validation (3 layers / by scope)
```

## Contributing

Contributions are welcome! Share your own skill definitions or improvements to existing ones via Pull Requests or Issues. This collection grows with everyone's knowledge.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-skill`)
3. Commit your changes (`git commit -m 'Add your skill'`)
4. Push to the branch and open a Pull Request

## Contact / Sites

- GitHub: [https://github.com/watanabe3tipapa/skills-seedling](https://github.com/watanabe3tipapa/skills-seedling)
- Related project: [okf-seedling](https://github.com/watanabe3tipapa/okf-seedling) — a template for growing OKF-compliant knowledge bundles

## License

MIT License — see the [LICENSE](LICENSE) file for details.
