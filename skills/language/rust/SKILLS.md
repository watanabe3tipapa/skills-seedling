---
name: rust
description: Rust のコードを書く・直す際のスキル。所有権・借用、エラー処理、トレイト、clippy に沿って実装を支援する。
category: language
tags: [rust, ownership, cargo, clippy]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# Rust

所有権と型システムを活かし、安全で効率的なコードを書くためのスキル。

## いつ使うか

- Rust の実装・修正・レビューを依頼されたとき
- ライブラリ、CLI、非同期処理を書くとき

## 基本方針

- 借用で済むなら所有権を移さない。`clone()` は最後の手段
- 回復可能なエラーは `Result`、不可能な状態は型で排除する
- `unwrap()` / `expect()` は「失敗しないことが型で保証される」箇所に限定する
- トレイト境界は必要十分に。過剰なジェネリクスを避ける

## 進め方

1. `Cargo.toml` の edition と依存、既存のエラー型を確認する
2. データの所有関係とライフタイムを先に設計する
3. 実装し、`unsafe` は原則使わない
4. `cargo fmt` / `cargo clippy` / `cargo test` を実行する

## チェックリスト

- [ ] 不要な `clone()` をしていないか
- [ ] `unwrap()` が妥当な箇所に限られているか
- [ ] エラー型が文脈を持つか
- [ ] `clippy` の警告が残っていないか
- [ ] `cargo test` が通るか

## 参考

- The Rust Book / Rust API Guidelines
- プロジェクトの `Cargo.toml`
