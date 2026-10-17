---
name: javascript
description: JavaScript のコードを書く・直す際のスキル。非同期処理、型変換、スコープ、ESLint に沿って実装を支援する。
category: language
tags: [javascript, async, node, es2023]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# JavaScript

暗黙の型変換を避け、非同期を一貫して扱うコードを書くためのスキル。

## いつ使うか

- JavaScript の実装・修正・レビューを依頼されたとき
- ブラウザ、Node.js、スクリプトを書くとき

## 基本方針

- `const` を優先し、`==` ではなく `===` を使う
- 非同期は `async` / `await` に統一し、Promise と混在させない
- 暗黙の型変換とグローバル汚染を避ける
- エラーは握りつぶさず、文脈を付けて伝播させる

## 進め方

1. 実行環境（Node / ブラウザ）とモジュール形式を確認する
2. 入出力とエラー処理の形を決める
3. 実装する（非同期は `await` で揃える）
4. ESLint / prettier / テストを実行する

## チェックリスト

- [ ] `===` を使っているか
- [ ] 未処理の Promise がないか
- [ ] グローバルを汚染していないか
- [ ] エラーを握りつぶしていないか
- [ ] ESLint が通るか

## 参考

- MDN JavaScript
- ESLint

