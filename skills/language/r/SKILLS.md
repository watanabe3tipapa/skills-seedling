---
name: r
description: R のコードを書く・直す際のスキル。tidyverse、ベクトル化、欠損値、再現性に沿って分析コードを支援する。
category: language
tags: [r, tidyverse, statistics, data-analysis]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# R

ベクトル化と再現性を意識し、欠損値を明示的に扱う分析コードを書くためのスキル。

## いつ使うか

- R の実装・修正・レビューを依頼されたとき
- 集計、可視化、統計モデリングのコードを書くとき

## 基本方針

- ベクトル化を優先し、要素ごとのループを避ける
- パイプ（`|>` / `%>%`）で処理をつなぐ
- 欠損値 `NA` と型（factor / numeric / character）を明示的に扱う
- 乱数を使うときは `set.seed` で再現性を確保する

## 進め方

1. 目的（集計 / 可視化 / モデル）と対象データを確認する
2. 入出力の型と欠損の扱いを決める
3. `dplyr` / `ggplot2` などで実装する
4. 再現可能なスクリプトとして実行し、結果を確認する

## チェックリスト

- [ ] `NA` を明示的に扱っているか
- [ ] 暗黙の型変換（factor → numeric 等）に注意したか
- [ ] `set.seed` で再現性を確保したか
- [ ] 1 始まり添字のオフバイワンはないか
- [ ] パッケージ依存を明記したか

## 参考

- R for Data Science
- tidyverse

