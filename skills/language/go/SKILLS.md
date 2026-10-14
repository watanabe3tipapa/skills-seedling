---
name: go
description: Go のコードを書く・直す際のスキル。エラーハンドリング、並行処理、インターフェース設計、go vet に沿って実装を支援する。
category: language
tags: [go, golang, concurrency, interfaces]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# Go

シンプルさを保ち、明示的にエラーを扱うコードを書くためのスキル。

## いつ使うか

- Go の実装・修正・レビューを依頼されたとき
- サーバ、CLI、並行処理を書くとき

## 基本方針

- エラーは明示的に返して処理する。`_` で捨てない
- エラーは `%w` でラップし、呼び出し側で `errors.Is/As` を使う
- インターフェースは利用側で定義し、小さく保つ
- 並行処理は `context` でキャンセル可能にし、goroutine リークを防ぐ

## 進め方

1. module 構成と既存のエラー処理・命名規約を確認する
2. 関数の責務とエラーの返し方を決める
3. 実装する。共有状態は channel か mutex で明示的に保護する
4. `go fmt` / `go vet` / `go test -race` を実行する

## チェックリスト

- [ ] エラーを無視していないか
- [ ] エラーを文脈付きでラップしているか
- [ ] goroutine リークの可能性はないか
- [ ] `go vet` と `go test -race` が通るか
- [ ] インターフェースが過剰に大きくないか

## 参考

- Effective Go / Go Code Review Comments
- プロジェクトの `go.mod`
