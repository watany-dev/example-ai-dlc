# タスク: <feature 名>

各タスクは TDD (failing test → 実装 → リファクタ) で進め、完了後に `make check`。

- [ ] T1: <タスク> — 依存: なし
- [ ] T2: <タスク> — 依存: T1
- [ ] T3: <タスク> — 依存: T1

## 完了条件

- すべてのタスクが完了し `make check` が green
- `update-spec` skill で spec とコードの整合を確認済み
