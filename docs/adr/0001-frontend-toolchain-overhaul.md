# 0001. フロントエンドエコシステムの選定

- ステータス: 承認
- 日付: 2026-05-19

## コンテキスト

`front/` は React 19 + TypeScript + Vite + Vitest + ESLint の最小スキャフォルド
のみで、本格的な機能実装に必要なツールチェーンが揃っていない。本リポジトリは
spec 駆動でプロジェクト管理・監視・可視化ダッシュボードを実装していく前提で、
`.kiro/steering/frontend.md` は「back の OpenAPI から型生成」「ユーザー視点の
振る舞いテスト」を方針として定めている。

機能実装に入る前に、lint/format・UI・API 連携・テスト・品質ゲートを揃える必要が
ある。`.kiro/steering/tech.md` の開発原則「最小依存 — ライブラリ追加は必要性を
吟味し理由を ADR に残す」に従い、選定根拠を本 ADR に記録する。

## 決定

以下のスタックを採用する。

- **Lint/Format**: ESLint から Biome v2 へ全面移行する。lint・format・import
  整列を単一ツールに統合し、pre-commit を高速に保つ。
- **UI**: Tailwind CSS v4 + `@tailwindcss/vite` と shadcn/ui。
- **API 連携**: `openapi-typescript`（back の `/openapi.json` から TS 型生成）+
  `openapi-fetch`（型付き軽量 fetch クライアント）。サーバ状態は
  `@tanstack/react-query`。API 境界・フォームのランタイム検証は `zod` を手書き併用。
- **ルーティング / フォーム**: `react-router` v7、`react-hook-form` +
  `@hookform/resolvers`。
- **テスト**: Vitest（既存）+ `@testing-library/jest-dom` / `user-event`、
  Vitest コンポーネントテストの API モックに `msw`、E2E に Playwright、
  プロパティベーステストに `fast-check`。カバレッジは `@vitest/coverage-v8` で
  しきい値 100% を品質ゲートに組み込む。
- **未使用検出**: `knip` で未使用ファイル / export / 依存を検出し品質ゲートに含める。
- **pre-commit**: `lefthook` で Biome を実行する。

`make check-front` を `biome / knip / tsc / vitest(coverage 100%) / vite build`
で構成し、横断ゲート `make check` の一部とする。可視化ライブラリ（Recharts 等）は
仕様が立った時点で別途追加するため今回は導入しない。

## 検討した代替案

- **ESLint + Prettier を継続**: 設定ファイルと依存が分散し、ツール間の責務境界の
  管理コストが高い。Biome は単一ツールで lint/format/import 整列をカバーし、
  実行も高速なため移行する。
- **API 型を手書き**: back の OpenAPI と二重管理になり乖離リスクが高い。
  steering の方針に反するため却下し、生成（openapi-typescript）を採用する。
- **API モックに独自 fetch スタブ**: 実装詳細に結合しやすい。`msw` はネットワーク
  層でモックでき、ユーザー視点の振る舞いテストに適する。
- **カバレッジしきい値を緩める**: ハーネス段階で 100% を強制することで、以後の
  spec 駆動実装に「新規コードへのテスト必須」を構造的に課せるため 100% を採用する。

## 影響

- 良い影響: ツールチェーンが単一情報源に整理され、品質ゲート（カバレッジ 100% +
  未使用検出）が CI と pre-commit で機械的に担保される。API 型は back と単一の
  契約から生成され乖離しない。
- トレードオフ: Biome は型認識リント（`typescript-eslint` の `no-floating-promises`
  等、型情報を要するルール）に同等物を持たない。現状の ESLint 設定は
  `recommended` のみで型認識ルールを使っておらず実害は小さく、`tsc --strict` が
  多くを補完するため許容する。
- トレードオフ: カバレッジ 100% としきい値ゲートにより、新規コードには必ず
  テストを付ける必要がある。これは TDD 方針（steering）と整合する意図的な制約。
- 生成物（`src/lib/api/schema.d.ts`）と shadcn 生成コンポーネント
  （`src/components/ui/**`）はカバレッジ対象外・knip ignore とする。
