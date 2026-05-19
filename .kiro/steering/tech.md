---
inclusion: always
---

# 技術スタックと開発ゲート

## 固定バージョン (単一情報源)

| 項目 | バージョン | 定義箇所 |
| --- | --- | --- |
| Node.js | 22 (LTS) | `.nvmrc` / 各 `package.json` の `engines` |
| Python | >= 3.12 | `back/pyproject.toml` の `requires-python` |
| AWS CDK | 2.x (`aws-cdk-lib` / `aws-cdk`) | `infra/package.json` |
| front 主要ツール | React 19 / Vite 6 / Vitest 3 / Biome 2 / Tailwind CSS 4 / Playwright 1 | `front/package.json` |

バージョン (メジャー) を変更したらこの表と定義ファイルの両方を更新する。
front の個別パッケージの正は `front/package.json`。

## 必須チェック (commit / push 前)

`make check` を必ずローカルで通す。CI (`.github/workflows/ci.yml`) と同じ
3 層の lint / typecheck / test を実行する。

| ターゲット | 対象 |
| --- | --- |
| `make check-front` | biome / knip / tsc / vitest (カバレッジ 100%) / vite build |
| `make check-back`  | ruff / mypy / pytest |
| `make check-infra` | tsc / jest / cdk synth |

E2E (Playwright) は `make check-front` に含めず、CI の独立 job で実行する。
pre-commit では lefthook が Biome を実行する (`npx lefthook install` で有効化)。

## ツールチェーン

- front: Vite + React + TypeScript。lint/format=Biome、未使用検出=knip、
  テスト=Vitest + Testing Library + MSW、E2E=Playwright、
  プロパティテスト=fast-check。UI=Tailwind CSS + shadcn/ui。
  API 型は openapi-typescript で back の OpenAPI から生成
- back: uv で依存管理 (`uv sync` / `uv run`)、lint=ruff / 型=mypy / test=pytest
- infra: AWS CDK v2、テストは Jest + `aws-cdk-lib/assertions`

## MCP サーバ (任意)

`.kiro/settings/mcp.json` に追加する。AI-DLC で有用な候補:

- `awslabs.aws-documentation-mcp-server` — AWS ドキュメント参照
- `awslabs.cdk-mcp-server` — CDK ベストプラクティス参照

既定では空 (`{"mcpServers": {}}`)。必要になった時点で最小限を追加する。

## 開発原則

- **TDD** — failing test → 実装 → リファクタ
- **Tidy First** — 機能変更の前に、読みやすさの整理を別コミットで行う
- **最小依存** — ライブラリ追加は必要性を吟味し、理由を ADR に残す
