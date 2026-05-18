---
name: update-spec
description: .kiro/specs/ 配下の spec (requirements / design / tasks) を評価し、front/back/infra のソースと突き合わせて整合性を検証・改善するスキル。
---

# update-spec スキル

`.kiro/specs/<feature>/` の spec を **収集 → 評価 → 整合確認 → 改善提案** の
4 フェーズで点検する。

## Phase 1: コンテキスト収集

- 対象 feature の `requirements.md` / `design.md` / `tasks.md` を読む
- spec が触れる `front/` `back/` `infra/` のソースを読む
- 関連する `.kiro/steering/` の規約を読む

## Phase 2: spec 品質評価 (100 点満点 / 5 カテゴリ)

各 20 点で採点。合計 90 点以上で construction 継続可。50 点未満は再設計。

| カテゴリ | 観点 |
| --- | --- |
| アーキテクチャ / 層境界設計 | front/back/infra の責務分離、層をまたぐ依存の妥当性 |
| API 契約 | front↔back の型整合 (OpenAPI)、back↔infra の構成整合 |
| ドメイン適合 / 要件トレース | `requirements.md` の EARS 要件と design/tasks の対応 |
| エラーハンドリング / 可観測性 | 異常系の設計、ログ・メトリクスの出力点 (監視システムゆえ重視) |
| テスト容易性 | vitest / pytest / cdk test のカバレッジ戦略、テスト追加箇所の具体性 |

## Phase 3: 整合性チェック

- spec ↔ ソースの双方向比較 (spec 済みだが未実装 / 実装済みだが未 spec を列挙)
- spec ↔ `.kiro/steering/` の規約整合
- `requirements` ↔ `design` ↔ `tasks` 間の用語・データ型の不整合検出

## Phase 4: 改善提案

- P0 (実装ブロッカー) / P1 (品質低下) / P2 (Nice to have) で分類
- 各指摘は「対象ファイル:行 → 問題 → 推奨修正」の形式で記述

## 出力テンプレート

```markdown
## 評価サマリ
| カテゴリ | 点数 |
| --- | --- |
| アーキテクチャ / 層境界設計 | xx / 20 |
| API 契約 | xx / 20 |
| ドメイン適合 / 要件トレース | xx / 20 |
| エラーハンドリング / 可観測性 | xx / 20 |
| テスト容易性 | xx / 20 |
| **合計** | **xx / 100** |

## 主要所見
...

## spec ↔ ソース整合性
...

## 改善提案
- P0: ...
- P1: ...
- P2: ...
```
