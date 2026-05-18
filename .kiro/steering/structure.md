---
inclusion: always
---

# リポジトリ構成

3 層モノレポ。層をまたぐ変更は各層の steering 規約に従う。

| ディレクトリ | 役割 | 言語 / 主技術 |
| --- | --- | --- |
| `front/` | Web UI (ダッシュボード・可視化) | TypeScript / React / Vite |
| `back/`  | API・ドメインロジック・エージェント | Python / FastAPI |
| `infra/` | AWS インフラ定義 | TypeScript / AWS CDK v2 |

## 共通ディレクトリ

- `.kiro/` — Kiro CLI ハーネス (steering / agents / skills / specs / settings)
- `docs/adr/` — アーキテクチャ決定記録 (ADR)
- `Makefile` — 横断品質ゲート (`make check`)

## 配置規約

- 新しい機能は対応する層の下に置く。層を越える共有が必要なら ADR を書く
- front↔back の境界は HTTP API。back が生成する OpenAPI を契約の正とする
- back↔infra の境界は CDK が定義するリソース。設定値は環境変数で受け渡す
- spec は `.kiro/specs/<feature>/` に `requirements.md` / `design.md` /
  `tasks.md` の 3 点セットで作成する
