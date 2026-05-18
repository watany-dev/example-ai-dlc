---
inclusion: fileMatch
fileMatchPattern: 'front/**'
---

# フロントエンド規約 (front/)

## スタック

Vite + React + TypeScript。UI はプロジェクト管理・監視データの可視化が中心
(ダッシュボード / タイムライン / 依存グラフ)。

## 規約

- TypeScript は `strict`。`any` を避け、API レスポンス型を明示する
- back の OpenAPI から型を生成し、手書きの API 型と二重管理しない
- コンポーネントは関数コンポーネント + Hooks。副作用は `useEffect` に閉じる
- テストは Vitest + Testing Library。表示・操作の振る舞いを検証する
  (実装詳細でなくユーザー視点)

## コマンド

- `npm run dev` — 開発サーバ
- `npm run lint` / `npm run typecheck` / `npm test` / `npm run build`
- 層の品質ゲートは `make check-front`
