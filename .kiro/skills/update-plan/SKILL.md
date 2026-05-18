---
name: update-plan
description: construction 着手前に spec (requirements / design / tasks) の完成度を update-spec と同等の基準で採点・改善するゲートスキル。/update-plan で起動する。
---

# update-plan スキル

`.kiro/specs/<feature>/` の spec が construction (実装) に進める品質かを
着手前に検証する 4 フェーズ。Kiro CLI に plan モードは無いため、本スキルが
Inception → Construction の移行ゲートを担う。

## Phase 1: コンテキスト収集

- 対象 feature の `requirements.md` / `design.md` / `tasks.md` を読む
- 関連する `.kiro/steering/` 規約と、spec が影響する既存ソースを読む

## Phase 2: 品質評価 (100 点満点 / 5 カテゴリ)

`update-spec` と同じ 5 カテゴリで採点する。合格ライン 90 点。

| カテゴリ | 観点 |
| --- | --- |
| アーキテクチャ / 層境界設計 | 触れる front/back/infra 境界の明確さ |
| API 契約 | front↔back / back↔infra の契約変更の影響範囲 |
| ドメイン適合 / 要件トレース | EARS 要件 ↔ design ↔ tasks の対応の完全性 |
| エラーハンドリング / 可観測性 | 異常系・ログ・メトリクスの計画 |
| テスト容易性 | 各タスクのテスト追加箇所の具体性 |

## Phase 3: 整合性チェック

- spec ↔ 既存ソースの整合 (参照シンボル・パスが実在するか)
- `tasks.md` の段階分け順序の妥当性 (依存関係の前後)

## Phase 4: 改善と出力

- 検出した問題を P0 / P1 / P2 に分類して spec に反映
- 末尾に検証サマリ (点数表 + 主要所見) を追記
- 合格したら construction (tasks 実行) へ進む

## 実行タイミング

spec を書き終えた直後、最初のタスク実装に着手する前に発動する。
