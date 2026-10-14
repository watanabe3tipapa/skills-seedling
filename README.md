# skills-seedling

**スキルは、集めるものではなく育てるもの。**

skills-seedling は、AI コーディング支援ツールで活用できる **SKILLS.md** を、開発用途・言語・実行環境別に体系化し、エージェントにも人間にも使いやすい形で育てていくキュレーションリポジトリです。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![SKILLS.md](https://img.shields.io/badge/SKILLS.md-collection-4f46e5.svg)](#分類体系)
[![GitHub](https://img.shields.io/github/issues/watanabe3tipapa/skills-seedling.svg)](https://github.com/watanabe3tipapa/skills-seedling/issues)

[日本語](README.md) | [English](README_en.md)

---

## 概要

skills-seedling は、目的や技術スタックに応じて必要なスキル定義をすぐに見つけられるよう、SKILLS.md を **4 つの軸**（開発用途 / プログラミング言語 / 実行環境 / その他）で整理したコレクションです。スキル定義を単なるコピー元ではなく「育てる」対象に置き、レビューと更新を通して鮮度と再利用性を保つことを目的としています。

## コンセプト (なぜ「育苗箱」か)

育苗箱は、種を本番の畑に移植できるまで守り育てる小さな箱です。skills-seedling も同様に、スキル定義を育てて各プロジェクトの AI ツールへ移植できる状態にします。

| 育苗箱の営み | skills-seedling での対応 |
|---|---|
| 種をまく | SKILLS.md を書き、PR で共有する |
| 箱で育苗する | 用途・言語・環境別に整理して保管する |
| 水をやり、間引く | 古い定義の更新・重複の整理・レビュー |
| 生育記録をつける | 対象・適用範囲・更新日を明記する |
| 双葉が開く | 用途軸と言語・環境軸の両方から引ける |
| 畑に移植する | プロジェクトに配置し、AI ツールへ読み込ませる |

## 主な特徴

- 4 つの軸で整理された分類体系
- スキルは `skills/<軸>/<スキル名>/SKILLS.md` に 1 概念 1 ファイルで収録
- `skills/manifest.json` を自動生成し、一覧・検索・ランチャーに利用
- AI コーディング支援ツール（エージェント）にそのまま渡せる SKILLS.md
- コピー&ペーストですぐ使える
- ブラウザのランチャーから **Right-Stuff Editor** を呼び出して編集
- GitHub の Pull Request / Issue によるキュレーション
- 方言・社内語（土語）を許容する 3 層設計と検証ツール（`tools/lint-skills.mjs`）
- 全体像を俯瞰できるランディングページ（HTML）

## 分類体系

| 軸 | ディレクトリ | 内容 |
|---|---|---|
| 開発用途別 | `skills/usage/` | Web 開発、バックエンド、データ分析、インフラ / DevOps など |
| プログラミング言語別 | `skills/language/` | Python、TypeScript、Rust、Go など |
| 実行環境別 | `skills/environment/` | ローカル開発、クラウド、SaaS 連携 |
| その他 | `skills/others/` | レビュー、テスト、セキュリティ、ドキュメントなど |

索引は `skills/manifest.json` に自動生成されます（`node tools/build-manifest.mjs`）。

## 方言を許容する設計（土語を育てる）

SKILLS.md は、英語や標準語に正規化しなくても成立します。**契約は標準語、本文は土語** — 機械が読む部分（frontmatter）だけを正規化し、本文のことば（方言・社内語・口語）はそのまま活かします。

- **A層 契約**: frontmatter のキーと値（`name` / `category` / `lang` / `scope` など）— 厳格
- **B層 本文**: 「いつ使うか」「進め方」などの本文 — 自由（方言 OK）
- **C層 橋渡し**: `description`・「ことばの註」・[`GLOSSARY.md`](GLOSSARY.md) — 意味に到達できることを担保

方言の見出しは意図アンカーで機械可読にできます。

```md
## どないな時に使うん {#when}
```

`lang`（使うことば）、`variety`（方言・社内語の名前）、`scope`（共有範囲）で、どこまで許容するかを調整します。`scope` が広いほど検証は厳しくなります（`team` は warn、`shared` / `canonical` は error）。

```bash
node tools/lint-skills.mjs            # 検証
node tools/lint-skills.mjs --strict   # warn も error 扱い
```

詳しくは [docs/skill-design.md](docs/skill-design.md) を参照してください。国産 LLM（例: 更科 / Sarashina）との相性についても触れています。

## 使い方

1. 目的に合ったカテゴリを選択 — 開発用途・言語・実行環境のいずれかから分類を選ぶ
2. 必要な SKILLS.md を探す — カテゴリ内でプロジェクトに合ったスキル定義を見つける
3. プロジェクトにコピーして活用 — ファイルをダウンロードまたはコピーし、AI コーディング支援ツールのスキル設定に読み込ませる

## エディタで編集（Right-Stuff Editor 連携）

`editor.html` はスキルを呼び出して編集するためのランチャーです。スキルを選んで「エディタで開く」を押すと、[Right-Stuff Editor](https://right-stuff-editor.vercel.app/editor) を新しいタブで開くと同時に、本文 Markdown をクリップボードへコピーします。エディタ上で貼り付けて編集してください。

ランチャーは **PWA** に対応しています（`manifest.webmanifest` + Service Worker）。対応ブラウザではホーム画面・デスクトップにインストールでき、一度読み込んだスキル一覧と本文はキャッシュされ、オフラインでも起動できます。

> ランチャーは `skills/manifest.json` と各 SKILLS.md を `fetch` するため、`file://` では動作しません。GitHub Pages などの HTTP 配信、または `npx serve` 等のローカルサーバで開いてください。

## GitHub Pages へのデプロイ

`index.html`（ランディングページ）と `editor.html`（ランチャー）は静的サイトとしてそのまま GitHub Pages で公開できます。デプロイは GitHub Actions（`.github/workflows/pages.yml`）で自動化しています。

初回のみ、リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定してください。以降は `main` ブランチへの push で自動的に公開されます（手動実行は Actions タブの `workflow_dispatch`）。

```bash
git init -b main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/watanabe3tipapa/skills-seedling.git
git push -u origin main
```

公開 URL は `https://watanabe3tipapa.github.io/skills-seedling/` です。

> `docs/*.md` や `GLOSSARY.md` は静的サイトでは Markdown のまま配信されます（GitHub 上では整形表示されます）。

## リポジトリ構成

```text
.
├── README.md                    # このファイル（日本語）
├── README_en.md                 # 英語版
├── GLOSSARY.md                  # ことばの対応表（土語のデコード）
├── LICENSE                      # MIT
├── index.html                   # ランディングページ
├── editor.html                  # エディタ・ランチャー（PWA）
├── manifest.webmanifest         # PWA マニフェスト
├── sw.js                        # Service Worker
├── icons/                       # PWA アイコン（SVG + PNG）
├── docs/
│   ├── skill-design.md          # SKILLS.md 設計方針（日本語）
│   └── skill-design_en.md       # 同（英語）
├── skills/
│   ├── manifest.json            # 自動生成される索引
│   ├── _TEMPLATE/SKILLS.md      # スキル雛形
│   ├── usage/                   # 開発用途別
│   ├── language/                # 言語別
│   ├── environment/             # 実行環境別
│   └── others/                  # その他
└── tools/
    ├── build-manifest.mjs       # manifest 生成スクリプト
    └── lint-skills.mjs          # SKILLS.md 検証（3 層 / scope 別）
```

> `.github/workflows/pages.yml` が GitHub Pages への自動デプロイを行います。

## コントリビューション

コントリビューションは歓迎します。自作のスキル定義や既存定義の改善案は、Pull Request や Issue で共有してください。このコレクションはみなさんの知見で成長します。

基本的なワークフロー:

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/your-skill`)
3. 変更をコミット (`git commit -m 'Add your skill'`)
4. ブランチをプッシュし、Pull Request を作成

## 連絡先 / 公開サイト

- GitHub: [https://github.com/watanabe3tipapa/skills-seedling](https://github.com/watanabe3tipapa/skills-seedling)
- 関連プロジェクト: [okf-seedling](https://github.com/watanabe3tipapa/okf-seedling) — OKF 準拠の知識バンドルを育てるテンプレート

## ライセンス

MIT ライセンス — 詳細は LICENSE ファイルを参照してください。
