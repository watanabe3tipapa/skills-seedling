---
name: scala
description: Scala のコードを書く・直す際のスキル。不変データ、Option/Either、パターンマッチ、型クラスに沿って実装を支援する。
category: language
tags: [scala, functional, option, pattern-matching]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# Scala

不変データと型でエラーを表し、副作用を境界へ寄せるコードを書くためのスキル。

## いつ使うか

- Scala の実装・修正・レビューを依頼されたとき
- データ処理、並行処理、関数型スタイルのコードを書くとき

## 基本方針

- `val` と不変コレクションを優先し、`var` を避ける
- `null` を使わず、`Option` / `Either` / `Try` で表現する
- パターンマッチを網羅的に書く
- 副作用を境界へ寄せ、`for` 内包で合成する

## 進め方

1. Scala バージョン（2.13 / 3）とビルドツール（sbt / Mill）を確認する
2. 型とエラー表現（`Option` / `Either` / `Try`）を決める
3. 純粋関数を中心に実装する
4. `scalafmt`、コンパイラ警告、テストを実行する

## チェックリスト

- [ ] `var` と可変コレクションを避けているか
- [ ] `null` を使っていないか
- [ ] パターンマッチが網羅的か
- [ ] 例外を戻り値に寄せているか
- [ ] 警告が有効か

## 参考

- Scala 3 ドキュメント
- Scala Style Guide

