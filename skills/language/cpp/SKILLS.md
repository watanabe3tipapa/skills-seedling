---
name: cpp
description: C++ のコードを書く・直す際のスキル。RAII、所有権、ムーブ、const 正しさ、モダン C++ の慣用句に沿って実装を支援する。
category: language
tags: [cpp, raii, memory, modern-cpp]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# C++

RAII で資源を管理し、所有権を型で表すコードを書くためのスキル。

## いつ使うか

- C++ の実装・修正・レビューを依頼されたとき
- 性能が要る処理、ライブラリ、システムを書くとき

## 基本方針

- RAII で資源を管理する。生の `new` / `delete` を避けスマートポインタを使う
- 所有権を型で表す（`unique_ptr` / `shared_ptr` / 参照）
- `const` 正しさを保つ。値渡し・参照・ムーブを使い分ける
- 範囲ベース for と標準アルゴリズムを優先し、例外安全を意識する

## 進め方

1. 対象標準（C++17 / 20 / 23）とビルド設定を確認する
2. 所有権と寿命、値/参照の受け渡しを設計する
3. 例外安全（基本保証/強い保証）を意識して実装する
4. `clang-tidy`、警告、sanitizer で検証する

## チェックリスト

- [ ] 生の `new` / `delete` を使っていないか
- [ ] 所有権が型で表れているか
- [ ] `const` を適切に付けているか
- [ ] 例外安全を意識したか
- [ ] ダングリング参照や未初期化はないか

## 参考

- C++ Core Guidelines
- Effective Modern C++

