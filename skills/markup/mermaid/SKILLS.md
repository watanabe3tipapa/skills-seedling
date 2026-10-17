---
name: mermaid
description: Mermaid を書く・整えるスキル。ダイアグラム種別、記法、レンダリング、保守性を踏まえて支援する。
category: markup
tags: [mermaid, diagrams, markdown]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# Mermaid

テキストで図を書き、Markdown に埋め込めるダイアグラムのスキル。

## いつ使うか

- Mermaid のダイアグラムを書く・直すとき
- フロー、シーケンス、状態遷移を文書に埋め込むとき

## 基本方針

- 図種別（flowchart / sequenceDiagram / stateDiagram 等）を目的に合わせて選ぶ
- ノード id を安定させ、ラベルは簡潔にする
- ソースを読みやすく保ち、レビュー可能にする
- レンダリング結果は自動生成物として扱う

## 進め方

1. 図の目的（流れ / 手順 / 状態 / 関係）を確認する
2. 図種別と粒度を決める
3. 記法で書く
4. レンダリングして構文とレイアウトを確認する

## チェックリスト

- [ ] 図種別が目的に合っているか
- [ ] 構文エラーがないか
- [ ] ノード id が安定しているか
- [ ] ラベルが読みやすいか

## 参考

- Mermaid ドキュメント
