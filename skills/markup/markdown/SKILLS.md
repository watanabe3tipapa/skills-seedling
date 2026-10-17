---
name: markdown
description: Markdown（.md）を書く・整えるスキル。見出し構造、リンク、表、コードブロック、方言の互換性を踏まえて支援する。
category: markup
tags: [markdown, gfm, commonmark, documentation]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# Markdown

見出し構造を保ち、方言の差を意識して書く Markdown のスキル。

## いつ使うか

- Markdown（`.md`）を書く・直す・レビューするとき
- README、ドキュメント、Issue / PR 本文を整えるとき

## 基本方針

- CommonMark を基準にし、方言（GFM / MDX / pandoc）を使う場合は明示する
- 見出しレベルを飛ばさない。1 文書 1 つの H1
- リンクは相対パスを優先し、壊れていないか確認する
- コードブロックには言語を付ける。表・リストの前後に空行を置く

## 進め方

1. 対象の方言（CommonMark / GFM / MDX / pandoc）を確認する
2. 見出しのアウトラインを先に決める
3. 本文を書き、リンク・表・コードブロックを整える
4. markdownlint などのリンタとプレビューで確認する

## チェックリスト

- [ ] 見出しレベルが飛んでいないか
- [ ] コードブロックに言語指定があるか
- [ ] リンクが相対パスで有効か
- [ ] 方言依存の記法を明示しているか
- [ ] 表・リストの前後に空行があるか

## 参考

- CommonMark 仕様
- GitHub Flavored Markdown
