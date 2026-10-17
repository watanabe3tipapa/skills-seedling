---
name: apple-notes-icloud-sync
description: Apple Notes の iCloud 同期を安定させるスキル。同期トラブルの切り分けと復旧手順を支援する。
category: apple
tags: [apple-notes, icloud, sync, troubleshooting]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# Apple Notes の iCloud 同期

「別の端末で見えない」を解決し、常に同じ状態を保つスキル。

## いつ使うか

- 端末間でメモが一致しないとき
- 同期が止まった / 競合したと感じたとき

## 基本方針

- 各端末で同じ Apple ID と iCloud ドライブ / メモが有効か確認する
- ネットワークと空き容量を先に確認する
- 競合したメモは消さずに残す
- 復旧は「更新 → 再起動 → 再ログイン」の順に試す

## 進め方

1. 対象端末の設定（Apple ID / iCloud / メモ）を確認する
2. ネットワーク・容量・電源を確認する
3. アプリ更新と再起動を試す
4. 直らなければ再ログインし、競合メモを確認する

## チェックリスト

- [ ] 全端末で同じ Apple ID か
- [ ] iCloud のメモが有効か
- [ ] 空き容量があるか
- [ ] 競合メモを消していないか

## 画面の手順 {#walkthrough}

1. 各端末で 設定 > [自分の名前] > iCloud を開き、「メモ」と「iCloud ドライブ」がオンか確認する。
2. ネットワークと空き容量（設定 > 一般 > [iPad]ストレージ）を確認する。
3. メモ.app を再起動し、直らなければ端末を再起動する。
4. それでも直らなければ iCloud からサインアウト → 再サインインする（競合メモは残す）。

## 参考

- Apple サポート（iCloud でメモを同期する）
