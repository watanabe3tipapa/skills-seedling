---
name: local-development
description: ローカル開発環境の構築・再現性確保を支援するスキル。開発サーバ、環境変数、devcontainer、依存のセットアップの依頼で発動する。
category: environment
tags: [local, devcontainer, env, setup]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# Local Development

誰でも同じ手順で立ち上がるローカル開発環境を整えるためのスキル。

## いつ使うか

- 開発環境のセットアップ手順を整備するとき
- 開発サーバ、環境変数、devcontainer を構成するとき
- 「自分の環境では動く」問題を解消するとき

## 基本方針

- セットアップは自動化し、README の手順だけで再現できるようにする
- 環境変数は `.env.example` に列挙し、実値はコミットしない
- バージョンは固定する（`.nvmrc`、`.tool-versions`、lockfile）
- マシン固有の設定に依存しない

## 進め方

1. 前提ツールとバージョンを確認し、固定ファイルを用意する
2. 依存インストールと初期化を1コマンドにまとめる
3. 開発サーバの起動と疎通確認手順を書く
4. 新規クローンから再現できるか検証する

## チェックリスト

- [ ] セットアップ手順が README に書かれているか
- [ ] シークレットをコミットしていないか
- [ ] ツールのバージョンを固定したか
- [ ] クリーンな環境で再現できたか
- [ ] `.env.example` が最新か

## 参考

- プロジェクトの README / CONTRIBUTING
- Development Containers 仕様
