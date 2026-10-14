---
name: kotlin
description: Kotlin のコードを書く・直す際のスキル。null 安全、データクラス、コルーチン、Gradle に沿って実装を支援する。
category: language
tags: [kotlin, android, coroutines, jvm]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# Kotlin

null 安全と簡潔さを活かした Kotlin コードを書くためのスキル。

## いつ使うか

- Kotlin の実装・修正・レビューを依頼されたとき
- Android / JVM / マルチプラットフォームのコードを書くとき

## 基本方針

- null 安全を活かし、`!!` を避ける
- データ保持は `data class` と不変（`val`）を基本にする
- 非同期はコルーチンで扱い、ブロッキング呼び出しを混ぜない
- スコープ関数は可読性が上がる箇所に限定する

## 進め方

1. Kotlin バージョンと対象（Android / JVM / KMP）を確認する
2. 型と null 許容を設計する
3. 実装し、コルーチンのスコープとキャンセルを意識する
4. ビルド・テスト・静的解析を実行する

## チェックリスト

- [ ] `!!` を使っていないか
- [ ] 可変状態を最小化しているか
- [ ] コルーチンのキャンセル・例外を扱っているか
- [ ] Android の場合、メインスレッドで重い処理をしていないか
- [ ] ビルドとテストが通るか

## 参考

- Kotlin Coding Conventions
- プロジェクトの `build.gradle(.kts)`
