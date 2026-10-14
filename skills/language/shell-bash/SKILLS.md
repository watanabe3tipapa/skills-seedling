---
name: shell-bash
description: Bash / Zsh スクリプトを書く・直す際のスキル。安全なオプション、クォート、エラー処理、移植性に配慮したスクリプトを支援する。
category: language
tags: [bash, shell, zsh, scripting]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# Shell / Bash

安全で壊れにくいシェルスクリプトを書くためのスキル。

## いつ使うか

- シェルスクリプトの実装・修正を依頼されたとき
- ビルド・デプロイ・自動化のスクリプトを書くとき

## 基本方針

- 先頭で `set -euo pipefail` を設定する
- 変数は必ずクォートする（`"$var"`）
- 外部コマンドの失敗を握りつぶさない
- `find` の出力を `for` で回すなど、空白や改行で壊れる書き方を避ける

## 進め方

1. 実行環境（bash / zsh、shellcheck の有無）を確認する
2. 引数と前提条件（コマンドの存在）を検証する
3. 実装し、エラー時は非0で終了しメッセージを出す
4. `shellcheck` を実行する

## チェックリスト

- [ ] `set -euo pipefail` を設定したか
- [ ] 変数をクォートしているか
- [ ] ファイル名の空白・改行を想定しているか
- [ ] `shellcheck` の警告がないか
- [ ] 途中失敗時に中途半端な状態を残さないか

## 参考

- Google Shell Style Guide
- shellcheck
