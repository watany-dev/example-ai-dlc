---
inclusion: always
---

# AI-DLC ワークフロー

本リポジトリは AI-DLC (AI-Driven Development Lifecycle) を Kiro CLI で実践する。
3 フェーズで進め、各フェーズに対応する skill を使う。

## フェーズ

### 1. Inception (要件・計画)

- 解くべき課題と要件を固める。曖昧な点は `grill-me` skill でユーザーに
  問い詰めて解消し、決定を `docs/adr/` に ADR として残す
- 機能ごとに `.kiro/specs/<feature>/` を作成し、`requirements.md` (EARS 記法)
  → `design.md` → `tasks.md` の順に書く
- construction 着手前に `update-plan` skill で spec の完成度を採点する

### 2. Construction (実装)

- `tasks.md` のタスクを TDD で 1 つずつ実装する
- spec とコードがずれたら `update-spec` skill で双方向に整合させる
- 各タスク完了時に `wrapup` skill (update-docs → make check) を実行する

### 3. Operations (運用)

- `infra/` の CDK でデプロイし、`back/` の監視機能で観測する
- 運用で得た知見は steering / ADR / spec にフィードバックする

## 原則

- **AI 実行 + 人間の監督** — エージェントが実装し、人間が要所で承認する
- **小さな単位** — 1 タスク = レビュー可能な最小変更。`make check` が常に green
