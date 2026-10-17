---
name: elixir
description: Elixir のコードを書く・直す際のスキル。不変性、パターンマッチ、OTP、プロセス設計に沿って実装を支援する。
category: language
tags: [elixir, otp, functional, beam]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# Elixir

不変データとパターンマッチで分岐し、プロセスを監督木に載せるコードを書くためのスキル。

## いつ使うか

- Elixir の実装・修正・レビューを依頼されたとき
- Phoenix、並行処理、耐障害性が要る処理を書くとき

## 基本方針

- パターンマッチと関数節で分岐する。`nil` チェックより型で表現する
- `with` で `{:ok, _}` / `{:error, _}` を連鎖させる
- プロセスは supervision tree 配下に置き、副作用を境界へ寄せる
- 状態は GenServer / Agent などに隔離し、純粋関数を優先する

## 進め方

1. OTP アプリ構成と既存のプロセス設計を確認する
2. データ構造とエラー表現（`{:ok, _}` / `{:error, _}`）を決める
3. 純粋関数 → プロセスの順に実装する
4. `mix format` / `mix test` / dialyzer を実行する

## チェックリスト

- [ ] `{:ok, _}` / `{:error, _}` を一貫して使っているか
- [ ] プロセスが supervision tree 配下か
- [ ] パターンマッチで網羅しているか
- [ ] 副作用を境界に寄せているか
- [ ] `mix format` 済みか

## 参考

- Elixir 公式ドキュメント
- OTP 設計原則

