---
name: org-mode
description: Org mode（.org）を書く・整えるスキル。見出し、TODO、属性、エクスポート、Babel を踏まえて支援する。
category: markup
tags: [org-mode, emacs, literate]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# Org mode

見出しとメタデータで構造を表し、文芸的プログラミングも扱うスキル。

## いつ使うか

- Org mode（`.org`）を書く・直すとき
- ノート、タスク、文書を Emacs でまとめるとき

## 基本方針

- 見出し階層と TODO 状態で構造と状態を表す
- メタは `#+TITLE:` などのキーワードで明示する
- コードは Babel で実行し、実行可否を明示する
- エクスポート先（HTML / LaTeX 等）を明示する

## 進め方

1. Emacs / Org のバージョンとエクスポート先を確認する
2. 見出し構造とタグを決める
3. 本文とコードブロックを書く
4. `org-lint` とエクスポートで確認する

## チェックリスト

- [ ] 見出し階層が正しいか
- [ ] エクスポートに必要な設定があるか
- [ ] Babel の実行可否を明示したか
- [ ] `org-lint` が通るか

## 参考

- Org mode マニュアル
