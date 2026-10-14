---
name: ruby
description: Ruby のコードを書く・直す際のスキル。慣用句、ブロック、例外、Bundler、Rails 規約に沿って実装を支援する。
category: language
tags: [ruby, rails, bundler, gem]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# Ruby

簡潔で読みやすい Ruby / Rails コードを書くためのスキル。

## いつ使うか

- Ruby の実装・修正・レビューを依頼されたとき
- Rails アプリのコードを書くとき

## 基本方針

- Ruby らしい慣用句（ブロック、Enumerable、`&.`）を使う
- 例外は具体的に rescue し、握りつぶさない
- Rails の慣習（Fat Model を避け、責務を分ける）に従う
- 依存は Bundler で固定し、gem を安易に増やさない

## 進め方

1. Ruby / Rails バージョンと既存規約を確認する
2. 責務とメソッドの境界を決める
3. 実装し、N+1 クエリを避ける
4. RuboCop・テストを実行する

## チェックリスト

- [ ] 例外を空 rescue していないか
- [ ] N+1 クエリがないか
- [ ] 破壊的メソッド（`!`）の使用は妥当か
- [ ] テストが通るか
- [ ] RuboCop の警告がないか

## 参考

- Ruby Style Guide / Rails Guides
- プロジェクトの `Gemfile`
