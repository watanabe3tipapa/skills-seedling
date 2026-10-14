---
name: browser-extension
description: ブラウザ拡張機能の実装を支援するスキル。Manifest、権限最小化、コンテンツスクリプト、メッセージ通信、審査要件を扱う。
category: environment
tags: [browser, extension, chrome, web]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# Browser Extension

最小権限で、審査に通るブラウザ拡張を作るためのスキル。

## いつ使うか

- Chrome / Firefox などの拡張機能を実装するとき
- 権限・ストア申請・配布を扱うとき

## 基本方針

- 権限は最小限にし、必要になった時点で要求する
- コンテンツスクリプトは対象ページのDOMと衝突しないようにする
- バックグラウンドとコンテンツ間は明示的なメッセージで通信する
- Manifest V3 など現行要件に従う

## 進め方

1. 対象ブラウザと Manifest バージョン、必要な権限を確認する
2. 各コンテキスト（background / content / popup）の責務を分ける
3. 実装し、権限とストレージを最小化する
4. ストア要件（プライバシー・説明）を満たすか確認する

## チェックリスト

- [ ] 権限は最小限か
- [ ] ページのスタイルと衝突しないか
- [ ] メッセージ通信の検証をしているか
- [ ] リモートコードを実行していないか
- [ ] ストア要件を満たしているか

## 参考

- Chrome Extensions / MDN WebExtensions
- 対象ストアの審査ポリシー
