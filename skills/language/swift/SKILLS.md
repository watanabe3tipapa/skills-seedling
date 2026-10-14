---
name: swift
description: Swift のコードを書く・直す際のスキル。Optional、値型、並行処理、SwiftUI/UIKit 規約に沿って実装を支援する。
category: language
tags: [swift, ios, swiftui, apple]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# Swift

安全で読みやすい Swift / Apple プラットフォームのコードを書くためのスキル。

## いつ使うか

- Swift の実装・修正・レビューを依頼されたとき
- SwiftUI / UIKit アプリのコードを書くとき

## 基本方針

- Optional を安全に扱い、強制アンラップ（`!`）を避ける
- 値型（struct / enum）を基本にし、参照型は必要な箇所に限る
- 並行処理は async/await と Actor でデータ競合を防ぐ
- メモリ管理（strong/weak）と循環参照に注意する

## 進め方

1. Swift / OS の最低対応バージョンを確認する
2. 型設計と Optional の扱いを決める
3. 実装し、UI 更新はメインアクターで行う
4. ビルド・テスト・（あれば）SwiftLint を実行する

## チェックリスト

- [ ] 強制アンラップを避けているか
- [ ] UI 更新がメインスレッドか
- [ ] 循環参照を作っていないか
- [ ] Actor/並行処理の境界が明確か
- [ ] ビルドとテストが通るか

## 参考

- Swift API Design Guidelines
- プロジェクトの `Package.swift` / Xcode 設定
