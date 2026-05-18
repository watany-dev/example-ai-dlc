---
inclusion: fileMatch
fileMatchPattern: 'back/**'
---

# バックエンド規約 (back/)

## スタック

FastAPI + Python。依存は uv で管理。API・ドメインロジック・エージェント処理
(プロジェクト管理 / 監視データ収集 / 集計) を担う。

## 規約

- パッケージは `src/ai_dlc_back/` レイアウト。型ヒントを全関数に付け mypy を通す
- API スキーマは Pydantic モデルで定義し、FastAPI が生成する OpenAPI を
  front との契約の正とする
- 例外は握りつぶさず、HTTP 層で適切なステータスへ変換する
- 監視・可視化システムゆえ可観測性を重視: 構造化ログと、主要処理の
  メトリクス出力点を設計時に決める
- テストは pytest。FastAPI の `TestClient` でエンドポイントを検証する

## コマンド

- `uv sync` — 依存同期、`uv run <cmd>` — 仮想環境内で実行
- `uv run ruff check .` / `uv run mypy src` / `uv run pytest`
- 層の品質ゲートは `make check-back`
