---
name: r-markdown
description: R Markdown（.Rmd）を書く・整えるスキル。knitr チャンク、YAML ヘッダ、出力形式、再現性を踏まえて支援する。
category: markup
tags: [rmarkdown, knitr, r, reproducible]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# R Markdown

knitr のチャンクと R のコードを織り込み、再現可能な文書を作るスキル。

## いつ使うか

- R Markdown（`.Rmd`）を書く・直すとき
- R の分析結果をレポートやスライドにまとめるとき

## 基本方針

- YAML ヘッダで `output` と knit 設定を明示する
- チャンクは label・`cache`・`echo` を意識する
- 乱数は `set.seed`、外部依存は明記する
- inline R とチャンクを使い分ける

## 進め方

1. 出力形式（`html_document` / `pdf_document` 等）を確認する
2. YAML ヘッダと knit オプションを決める
3. チャンクを分け、キャッシュと依存を整理する
4. `rmarkdown::render()` で確認する

## チェックリスト

- [ ] 出力形式に必要な依存が揃っているか
- [ ] チャンクに label を付けているか
- [ ] `set.seed` で再現性を確保したか
- [ ] キャッシュの前提が正しいか
- [ ] エラーで knit が止まらない設定になっていないか

## 参考

- R Markdown: The Definitive Guide
- knitr
