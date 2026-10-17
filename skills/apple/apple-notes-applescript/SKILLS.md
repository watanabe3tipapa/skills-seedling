---
name: apple-notes-applescript
description: AppleScript / JXA で Apple Notes を操作するスキル。一括作成・抽出・整形のスクリプトを安全に組む。
category: apple
tags: [apple-notes, applescript, jxa, automation]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# AppleScript / JXA で Apple Notes を操作

大量のメモを一括で扱うためのスクリプト活用スキル。

## いつ使うか

- メモの一括作成・抽出・変換をしたいとき
- 定期処理を自動化したいとき

## 基本方針

- 実行前に必ずバックアップを取る
- 一括変更は少数でドライランしてから本番
- 対象アカウント / フォルダを明示する
- `body`（プレーン）と `body`（HTML）の扱いに注意する

## 進め方

1. 目的（作成 / 取得 / 更新）と対象を決める
2. 少数のメモで試す
3. 結果を検証（件数 / 内容）する
4. 本番実行し、必要なら元に戻せるようにする

## チェックリスト

- [ ] バックアップを取ったか
- [ ] 対象アカウント / フォルダを指定したか
- [ ] 少数でのドライランを行ったか
- [ ] HTML / プレーンテキストの扱いを確認したか

## 参考

- AppleScript / JXA リファレンス
