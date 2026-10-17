---
name: latex
description: LaTeX を書く・整えるスキル。プリアンブル、数式、相互参照、ビルドを踏まえて文書作成を支援する。
category: markup
tags: [latex, tex, typesetting]
version: 0.1.0
updated: 2026-10-18
lang: ja
scope: shared
---

# LaTeX

プリアンブルを整理し、数式と相互参照を正しく扱う組版のスキル。

## いつ使うか

- LaTeX（`.tex`）を書く・直すとき
- 論文、報告書、数式の多い文書を組むとき

## 基本方針

- プリアンブルを整理し、パッケージを最小限にする
- 数式は `amsmath` を使い、意味のある記号名にする
- 参照は `\label` / `\ref` で管理する
- ビルドは複数回実行し、参照と目次を解決する

## 進め方

1. エンジン（pdflatex / xelatex / lualatex）と文書クラスを確認する
2. プリアンブルを整える
3. 本文と数式を書く
4. 複数回ビルドし、警告と参照を確認する

## チェックリスト

- [ ] 参照・目次が解決しているか
- [ ] 未定義コマンド / パッケージがないか
- [ ] overfull / underfull box を確認したか
- [ ] エンジンと日本語設定が合っているか

## 参考

- LaTeX ドキュメント
- amsmath
