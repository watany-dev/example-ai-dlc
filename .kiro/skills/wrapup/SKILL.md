---
name: wrapup
description: コーディングタスク完了時・応答終了前に、update-docs と make check を順に実行して締めるスキル。タスク完了時や /wrapup と言われたときに発動する。
---

# wrapup スキル

編集タスクが終わるたびに、ドキュメント追従と品質ゲートを確実に通すための
まとめスキル。

## 手順

1. **update-docs を実行**: `update-docs` skill を呼び出し、ソースの変更を
   `README.md` / `.kiro/steering/` / `AGENTS.md` に反映する。
2. **`make check` を流す**: 変更があった層について `make check` (または
   `make check-front` / `check-back` / `check-infra`) でフォーマット・lint・
   typecheck・test を確認する。失敗したら直してから次へ進む。
3. **完了報告**: 変更したファイル・通したチェック・残課題を簡潔に報告する。

## 注意

- `make check` が green でないままタスクを完了扱いにしない。
- update-docs が「変更なし」と報告しても手順 2・3 は省略しない。
- ptuf の simplify ステップと stop-hook マーカー処理は本リポジトリでは
  採用していない (Kiro CLI に stop hook イベントが無いため)。
