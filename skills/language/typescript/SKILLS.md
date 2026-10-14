---
name: typescript
description: TypeScript のコードを書く・直す際のスキル。厳格な型付け、型ガード、ジェネリクス、モジュール構成に沿って実装を支援する。
category: language
tags: [typescript, types, node, frontend]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# TypeScript

型で不変条件を表現し、実行時エラーを減らすコードを書くためのスキル。

## いつ使うか

- TypeScript / JavaScript の実装・修正・レビューを依頼されたとき
- 型定義、API クライアント、ユーティリティを書くとき

## 基本方針

- `any` を避ける。`unknown` から型ガードで絞り込む
- 境界（外部入力）は `unknown` として受け、パースしてから使う
- 状態は判別可能な union で表現し、不正状態を型で作れなくする
- `strict` を前提にし、型エラーを `ts-ignore` で消さない

## 進め方

1. `tsconfig` の strict 設定と既存の型パターンを確認する
2. 公開 API の型を決め、実装はそれに合わせる
3. ジェネリクスは必要最小限。`as` によるキャストは最後の手段
4. 型チェック・lint・テストを実行する

## チェックリスト

- [ ] `any` や安易な `as` を使っていないか
- [ ] 外部入力のバリデーションがあるか
- [ ] null / undefined を型で扱えているか
- [ ] `tsc --noEmit` と lint が通るか
- [ ] 公開型の後方互換を壊していないか

## 参考

- TypeScript Handbook
- プロジェクトの `tsconfig.json`
