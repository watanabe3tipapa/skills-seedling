---
name: asciidoc
description: AsciiDoc を書く・整えるスキル。文書属性、インクルード、表、相互参照を踏まえて支援する。
category: markup
tags: [asciidoc, asciidoctor, documentation]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# AsciiDoc

属性とインクルードで再利用できる、構造化された文書を書くスキル。

## いつ使うか

- AsciiDoc（`.adoc`）を書く・直すとき
- 技術文書、マニュアル、書籍を組むとき

## 基本方針

- 属性（`:attr:`）で値や条件を再利用する
- `include::` で文書を分割し、見通しを保つ
- 相互参照（`<<id>>`）とアンカーを使う
- ブロック（ソース、表、例）は明示的に書く

## 進め方

1. プロセッサ（Asciidoctor）と文書タイプを確認する
2. 属性とインクルード構成を決める
3. 本文を書く
4. `asciidoctor` でビルドし、警告を確認する

## チェックリスト

- [ ] インクルードのパスが有効か
- [ ] 相互参照が解決するか
- [ ] 未定義の属性参照がないか
- [ ] ビルド警告がないか

## 参考

- Asciidoctor ドキュメント
