---
name: apple-notes-export-import
description: Apple Notes のエクスポート／インポートのスキル。PDF・Markdown・.enex への書き出しと他ツールからの移行を支援する。
category: apple
tags: [apple-notes, export, import, migration]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# Apple Notes の書き出しと取り込み

メモを他所へ持ち出し、また取り込めるようにするスキル。

## いつ使うか

- メモを Markdown / PDF で保存・共有したいとき
- 他ツールから Notes へ移したいとき

## 基本方針

- 移行前に必ず書き出す（元データを残す）
- 用途で形式を選ぶ（PDF / Markdown / .enex）
- 添付は書き出しで抜けないか確認する
- 取り込み後は件数と添付を照合する

## 進め方

1. 目的（保管 / 共有 / 移行）と形式を決める
2. 対象フォルダを書き出す
3. 添付と書式の抜けを確認する
4. 取り込む場合は件数を照合する

## チェックリスト

- [ ] 移行前に書き出したか
- [ ] 形式が目的に合っているか
- [ ] 添付が保たれたか
- [ ] 取り込み後の件数を照合したか

## 画面の手順 {#walkthrough}

1. 目的（保管 / 共有 / 移行）と形式（PDF / Markdown / .enex）を決める。
2. 対象のメモまたはフォルダを開く。
3. メモを右クリック >「書き出す」で形式を選ぶ（フォルダは「ファイル > フォルダを書き出す」）。
4. 取り込む場合は「ファイル > 読み込む」で .enex などを選ぶ。
5. 添付・書式の抜けと件数を照合する。

## スクリプト実例 {#examples}

タイトル一覧を書き出して控えを取る:

```bash
osascript -l JavaScript -e 'Application("Notes").notes.name().join("\n")' > notes-titles.txt
```

本文（HTML）を取得する:

```bash
osascript -l JavaScript -e 'Application("Notes").notes.body().join("\n")' > notes-body.html
```

> 移行前に必ず元データを残し、件数を照合してください。

## 参考

- Apple サポート（メモを書き出す / 読み込む）
