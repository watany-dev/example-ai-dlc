---
name: update-docs
description: README.md / .kiro/steering/ / AGENTS.md を最新の front/back/infra ソースに追従させる更新スキル。
---

# update-docs スキル

ソースとドキュメントの乖離を解消する 5 フェーズスキル。

## Phase 1: ソース構造の把握

- `front/` のエントリ (`src/main.tsx` 等) と `package.json` の scripts / deps
- `back/` のエントリ (`src/ai_dlc_back/main.py`) と `pyproject.toml`
- `infra/` のスタック (`lib/`, `bin/infra.ts`) と `package.json`

## Phase 2: steering 反映

- `.kiro/steering/` の各ファイルを Phase 1 の事実と突き合わせて更新
- 改名・削除されたモジュール、追加された依存・コマンドを追従
- 固定バージョン表 (`tech.md`) と実ファイルの値を一致させる

## Phase 3: README 反映

- `README.md` (英語) に次を含める: プロジェクト概要、モノレポ構成、
  `make check` と各層コマンド、Kiro CLI ハーネスの説明

## Phase 4: 横断整合性チェック

- 全ドキュメント間でコマンド名・パス・バージョン・用語が一致しているか確認
- 言語規約: `README.md` は英語、`.kiro/**` と `AGENTS.md` は日本語

## Phase 5: 報告

- 更新ファイル一覧 / 新規追加すべきドキュメント候補 / 未解消の不整合
