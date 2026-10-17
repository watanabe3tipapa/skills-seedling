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

## 画面の手順 {#walkthrough}

1. 目的と対象（作成 / 取得 / 更新、アカウント / フォルダ）を決める。
2. 少数のメモでコマンドを試す。
3. 結果（件数 / 内容）を検証する。
4. 本番実行し、必要なら元に戻せるようにする。

## スクリプト実例 {#examples}

メモを 1 件作る（JXA を `osascript` 経由で実行）:

```bash
osascript -l JavaScript -e 'Application("Notes").make({new:"note", withProperties:{body:"買い物<br>牛乳、卵"}})'
```

件数とタイトル一覧を取得する:

```bash
osascript -l JavaScript -e 'Application("Notes").notes.length'
osascript -l JavaScript -e 'Application("Notes").notes.name()'
```

AppleScript でフォルダを指定して作る:

```applescript
tell application "Notes"
  tell account "iCloud"
    make new note at folder "Notes" with properties {body:"<h1>タイトル</h1><p>本文</p>"}
  end tell
end tell
```

> `body` は HTML として解釈されます。実行前に対象のバックアップを取り、一括変更は少数でドライランしてください。

## 参考

- AppleScript / JXA リファレンス
