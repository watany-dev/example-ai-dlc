# spec ディレクトリ

機能ごとの spec を `.kiro/specs/<feature>/` に置く。各 feature は 3 ファイル
構成:

| ファイル | 役割 |
| --- | --- |
| `requirements.md` | 要件。EARS 記法のユーザーストーリー |
| `design.md` | 技術設計。アーキテクチャ・データモデル・API |
| `tasks.md` | 実装タスク。依存関係つきのチェックリスト |

## ワークフロー

1. `requirements.md` を書く (Inception)。EARS 記法:
   「WHEN <条件> THE SYSTEM SHALL <振る舞い>」
2. `design.md` を書く。requirements の全項目を設計でカバーする
3. `tasks.md` を書く。design を実装単位に分解する
4. `update-plan` skill で採点し、90 点以上で construction へ進む
5. tasks を TDD で 1 つずつ実装し、完了ごとに `wrapup` skill を実行する

新しい feature は `_template/` をコピーして始める。
