# AGENTS.md

このファイルは AI エージェント (Kiro CLI など) が `example-ai-dlc` リポジトリで
作業する際の指針である。

## プロジェクト

ビジネスのプロジェクト管理・監視・可視化を行うエージェントシステム。AI-DLC
(AI-Driven Development Lifecycle) を Kiro CLI で実践する。詳細は
`.kiro/steering/` を参照:

- `product.md` — プロダクト概要・ドメイン
- `structure.md` — モノレポ構成と配置規約
- `tech.md` — 技術スタック・固定バージョン・開発ゲート
- `ai-dlc.md` — AI-DLC ワークフロー (Inception→Construction→Operations)
- `frontend.md` / `backend.md` / `infra.md` — 各層の規約 (該当層の編集時に適用)

## 必須チェック (commit / push 前)

`make check` を必ずローカルで通すこと。CI (`.github/workflows/ci.yml`) と同じ
3 層の lint / typecheck / test を実行する。

- `make check-front` — biome / knip / tsc / vitest (カバレッジ 100%) / vite build
- `make check-back` — ruff / mypy / pytest
- `make check-infra` — tsc / jest / cdk synth

E2E (Playwright) は `make check-front` には含めず、CI の独立 job と
`cd front && npm run test:e2e` で実行する。

## skill

`.kiro/skills/` の skill を活用する:

- `grill-me` — 計画・設計を詰める
- `update-plan` — construction 着手前に spec を採点する
- `update-spec` — spec とコードの整合を検証する
- `update-docs` — ドキュメントをソースに追従させる
- `wrapup` — タスク完了時に update-docs と make check を実行する

## 開発手法

- **spec 駆動** — 機能は `.kiro/specs/<feature>/` の requirements → design →
  tasks を経て実装する
- **TDD** — failing test → 実装 → リファクタ
- **Tidy First** — 機能変更の前に、読みやすさの整理を別コミットで行う
- 重要な決定は `docs/adr/` に ADR として残す

## 言語規約

`README.md` は英語、`.kiro/**` と本ファイルは日本語。
