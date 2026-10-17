---
name: powershell
description: PowerShell のコードを書く・直す際のスキル。オブジェクトパイプライン、エラー処理、冪等性、PSScriptAnalyzer に沿って支援する。
category: language
tags: [powershell, automation, pipeline, windows]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# PowerShell

オブジェクトをパイプラインで流し、冪等に動く自動化を書くためのスキル。

## いつ使うか

- PowerShell の実装・修正・レビューを依頼されたとき
- Windows / クラウドの運用・自動化スクリプトを書くとき

## 基本方針

- 文字列ではなくオブジェクトをパイプラインで渡す
- 承認済み動詞（`Get-` / `Set-` / `New-` など）で命名する
- `ShouldProcess` に対応し `-WhatIf` / `-Confirm` を効かせる
- エラーは `-ErrorAction Stop` と `try/catch` で扱い、冪等に書く

## 進め方

1. 対象バージョン（5.1 / 7+）と実行環境を確認する
2. 入出力の型とエラー方針を決める
3. パイプラインを意識して実装する
4. PSScriptAnalyzer と `-WhatIf` で検証する

## チェックリスト

- [ ] 承認済み動詞で命名しているか
- [ ] `ShouldProcess` / `-WhatIf` に対応しているか
- [ ] エラーを握りつぶしていないか
- [ ] パスや資格情報をハードコードしていないか
- [ ] PSScriptAnalyzer が通るか

## 参考

- PowerShell ドキュメント
- PSScriptAnalyzer

