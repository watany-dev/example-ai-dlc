---
inclusion: fileMatch
fileMatchPattern: 'front/**'
---

# フロントエンド規約 (front/)

## スタック

Vite + React + TypeScript。UI はプロジェクト管理・監視データの可視化が中心
(ダッシュボード / タイムライン / 依存グラフ)。

- スタイリング: Tailwind CSS v4 + shadcn/ui (生成コンポーネントは
  `src/components/ui/`)
- サーバ状態: TanStack Query、ルーティング: react-router
- API 連携: `openapi-typescript` で back の OpenAPI から型生成
  (`npm run gen:api`)、`openapi-fetch` でリクエスト。境界バリデーションは zod
- フォーム: react-hook-form + zod resolver
- lint / format: Biome

## 規約

- TypeScript は `strict`。`any` を避け、API レスポンス型を明示する
- back の OpenAPI から型を生成し、手書きの API 型と二重管理しない。
  生成物 `src/lib/api/schema.d.ts` は直接編集せず `gen:api` で再生成する
- API 境界のレスポンスは zod で検証し、不正値は fetch 層でエラーに変換する
- コンポーネントは関数コンポーネント + Hooks。副作用は `useEffect` に閉じる
- テストは Vitest + Testing Library。表示・操作の振る舞いを検証する
  (実装詳細でなくユーザー視点)。API は MSW でモックする
- 不変則・純粋関数は fast-check のプロパティテストで検証する
- カバレッジは 100% を維持する。新規コードには必ずテストを付ける
- 主要な利用フローは Playwright の E2E で検証する

## コマンド

- `npm run dev` — 開発サーバ
- `npm run lint` / `npm run format` — Biome
- `npm run typecheck` / `npm test` / `npm run build`
- `npm run knip` — 未使用ファイル / export / 依存の検出
- `npm run gen:api` — back の OpenAPI から型生成 (back の起動が必要)
- `npm run test:e2e` — Playwright E2E
- 層の品質ゲートは `make check-front` (lint / knip / typecheck / test / build)。
  E2E は含めない
