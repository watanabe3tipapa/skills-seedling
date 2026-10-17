---
name: djot
description: Djot を書く・整えるスキル。CommonMark との違い、属性、脚注、厳密な記法を踏まえて支援する。
category: markup
tags: [djot, markup, pandoc]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# Djot

記号の意味が厳密な軽量マークアップで、曖昧さを避けて書くスキル。

## いつ使うか

- Djot（`.dj`）文書を書く・直すとき
- Markdown の曖昧な記法を避けたいとき

## 基本方針

- 記号の意味が厳密な点を活かし、曖昧な記法を避ける
- 属性 `{#id .class key=val}` を活用する
- CommonMark との差異（強調、リストの解釈）を意識する
- 脚注・定義リストなど構造化要素を使い分ける

## 進め方

1. 変換先（HTML / pandoc）を確認する
2. 見出しと属性で構造を表す
3. 脚注・定義リストを使って本文を書く
4. Djot のパーサ / CLI でレンダリングして確認する

## チェックリスト

- [ ] 記法が Djot 仕様に沿っているか
- [ ] 属性の構文が正しいか
- [ ] 変換先で意図どおり表示されるか
- [ ] CommonMark 前提の記法を混在させていないか

## 参考

- Djot 仕様
