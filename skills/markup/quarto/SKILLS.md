---
name: quarto
description: Quarto（.qmd）を書く・整えるスキル。YAML ヘッダ、コードチャンク、出力形式、再現性を踏まえて文書作成を支援する。
category: markup
tags: [quarto, qmd, pandoc, reproducible]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# Quarto

Markdown と実行可能なコードを組み合わせ、再現可能な文書を作るスキル。

## いつ使うか

- Quarto（`.qmd`）文書を書く・直すとき
- 分析レポート、スライド、サイトを再現可能に組むとき

## 基本方針

- YAML ヘッダで `title` / `format` / `execute` を明示する
- コードチャンクは label と `echo` / `warning` を意識する
- 実行に依存する出力はキャッシュ / `freeze` を検討する
- 図表はキャプションと相互参照（`@fig-` / `@tbl-`）を付ける

## 進め方

1. 出力形式（html / pdf / docx / beamer）と実行言語を確認する
2. YAML ヘッダ（`title` / `format` / `execute`）を決める
3. チャンクを分け、依存関係とキャッシュを整理する
4. `quarto render`（または preview）で確認する

## チェックリスト

- [ ] YAML ヘッダが妥当か
- [ ] チャンクに label を付けているか
- [ ] 出力形式に必要な依存（LaTeX 等）が揃っているか
- [ ] 図表の相互参照が解決するか
- [ ] 再現可能（seed / キャッシュ）か

## 参考

- Quarto ドキュメント
- Pandoc
