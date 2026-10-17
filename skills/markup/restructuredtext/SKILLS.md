---
name: restructuredtext
description: reStructuredText を書く・整えるスキル。ディレクティブ、ロール、相互参照、Sphinx 連携を踏まえて支援する。
category: markup
tags: [restructuredtext, sphinx, documentation]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# reStructuredText

ディレクティブとロールで意味を明示し、Sphinx と組む文書を書くスキル。

## いつ使うか

- reStructuredText（`.rst`）を書く・直すとき
- Sphinx で API ドキュメントや技術文書を組むとき

## 基本方針

- 見出し記号の階層を一貫させる（記号の重複を避ける）
- ディレクティブ・ロールで意味を明示する
- ラベルと `:ref:` で相互参照する
- インデントを厳密に保つ

## 進め方

1. ビルド（Sphinx / docutils）を確認する
2. 文書ツリーとラベル構成を決める
3. 本文を書く
4. ビルドし、警告を確認する

## チェックリスト

- [ ] 見出し記号の階層が正しいか
- [ ] 参照ラベルが解決するか
- [ ] ビルド警告がないか
- [ ] コードブロックに言語指定があるか

## 参考

- docutils
- Sphinx
