---
inclusion: fileMatch
fileMatchPattern: 'infra/**'
---

# インフラ規約 (infra/)

## スタック

AWS CDK v2 (TypeScript)。`back/` の API と `front/` の配信、監視リソースを定義する。

## 規約

- スタックは `lib/` に定義し、`bin/infra.ts` から合成する
- リソースには論理的な命名を付け、環境差分は context / 環境変数で受ける
- 変更は必ず `cdk synth` が通ることを確認する。可能なら `cdk diff` で影響を見る
- テストは Jest + `aws-cdk-lib/assertions` の `Template` で、生成される
  CloudFormation を検証する
- デプロイ先構成 (back を Lambda / ECS / App Runner のどれに載せるか等) は
  spec の `design.md` で決定し、確定するまでスタックは最小に保つ

## コマンド

- `npm run typecheck` / `npm test` / `npm run synth` / `npm run build`
- デプロイ: `npx cdk deploy` (認証情報が必要)
- 層の品質ゲートは `make check-infra`
