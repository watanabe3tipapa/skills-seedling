---
name: python
description: Python のコードを書く・直す際のスキル。型ヒント、venv、pytest、パッケージ管理、慣用的な書き方に沿って実装を支援する。
category: language
tags: [python, typing, pytest, packaging]
version: 0.1.0
updated: 2026-10-14
lang: ja
scope: shared
---

# Python

Pythonic で型付けされた、保守しやすいコードを書くためのスキル。

## いつ使うか

- Python のコードの実装・修正・レビューを依頼されたとき
- スクリプト、CLI、ライブラリ、テストを書くとき

## 基本方針

- 型ヒントを付ける。公開関数・境界の型は省略しない
- 標準ライブラリを優先し、依存を安易に増やさない
- list/dict 内包、`pathlib`、`dataclass` など慣用句を使う
- 例外は握りつぶさず、文脈を付けて送出する

## 進め方

1. 対象の Python バージョンと依存管理（uv / poetry / pip）を確認する
2. 型と入出力の契約を決めてから実装する
3. `pytest` でテストを書き、境界値と異常系をカバーする
4. `ruff` / `mypy`（導入済みなら）を実行する

## チェックリスト

- [ ] 型ヒントが付いているか
- [ ] 例外を握りつぶしていないか
- [ ] 可変デフォルト引数を使っていないか
- [ ] `ruff` / `mypy` / `pytest` が通るか
- [ ] 依存を増やす場合、その理由が妥当か

## 参考

- PEP 8 / PEP 484
- プロジェクトの `pyproject.toml`
