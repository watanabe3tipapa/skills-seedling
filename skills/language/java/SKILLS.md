---
name: java
description: Java のコードを書く・直す際のスキル。型付け、例外設計、コレクション、並行処理、ビルドツールに沿って実装を支援する。
category: language
tags: [java, jvm, maven, gradle]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# Java

堅牢で保守しやすい JVM アプリケーションを書くためのスキル。

## いつ使うか

- Java の実装・修正・レビューを依頼されたとき
- Spring などのフレームワーク導入コードを書くとき

## 基本方針

- `Optional` と不変コレクションで null と変更を減らす
- 例外は回復可能なら検査例外/戻り値、バグなら unchecked にする
- ストリームは可読性を優先し、乱用しない
- 並行処理は `java.util.concurrent` を使い、手動 Thread を避ける

## 進め方

1. Java バージョンとビルドツール（Maven / Gradle）を確認する
2. 既存の例外・DI・命名規約に合わせて設計する
3. 実装し、リソースは try-with-resources で閉じる
4. ビルド・テスト・静的解析を実行する

## チェックリスト

- [ ] null を型・`Optional` で扱っているか
- [ ] リソースを確実に解放しているか
- [ ] 例外を握りつぶしていないか
- [ ] 可変共有状態を適切に同期しているか
- [ ] ビルドとテストが通るか

## 参考

- Effective Java / Java API ドキュメント
- プロジェクトの `pom.xml` / `build.gradle`
