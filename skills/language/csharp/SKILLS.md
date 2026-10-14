---
name: csharp
description: C#/.NET のコードを書く・直す際のスキル。型付け、async/await、LINQ、DI に沿って実装を支援する。
category: language
tags: [csharp, dotnet, async, linq]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# C# / .NET

型と非同期を活かした .NET アプリケーションを書くためのスキル。

## いつ使うか

- C# / .NET の実装・修正・レビューを依頼されたとき
- ASP.NET などのサービス／CLI を書くとき

## 基本方針

- nullable 参照型を有効にし、null を型で扱う
- async/await を一貫して使い、`.Result` / `.Wait()` を同期ブロックで呼ばない
- LINQ は可読性のため。遅延評価の副作用に注意する
- `IDisposable` は `using` で確実に破棄する

## 進め方

1. 対象フレームワーク版（.NET 8 など）と既存規約を確認する
2. 型と非同期の境界を決める
3. 実装し、CancellationToken を引き回す
4. ビルド・テスト・アナライザを実行する

## チェックリスト

- [ ] null 許容を型で表現しているか
- [ ] async を同期ブロックしていないか
- [ ] `IDisposable` を破棄しているか
- [ ] 例外を握りつぶしていないか
- [ ] ビルド・テストが通るか

## 参考

- Microsoft C# コーディング規約
- プロジェクトの `.csproj` / `Directory.Build.props`
