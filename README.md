# example-ai-dlc

An agent system for **business project management, monitoring, and
visualization**, built as a worked example of the **AI-DLC (AI-Driven
Development Lifecycle)** using the **Kiro CLI** harness in this repository.

This repository is currently at the **harness stage**: the monorepo skeleton
and Kiro CLI configuration are in place, but the business logic has not been
built yet. Features are implemented later, spec-first, from `.kiro/specs/`.

## Monorepo layout

| Directory | Role | Stack |
| --- | --- | --- |
| `front/` | Web UI (dashboards, visualization) | TypeScript / React / Vite |
| `back/`  | API, domain logic, agents | Python / FastAPI |
| `infra/` | AWS infrastructure | TypeScript / AWS CDK v2 |
| `.kiro/` | Kiro CLI harness | steering / agents / skills / specs / settings |
| `docs/adr/` | Architecture Decision Records | — |

## Prerequisites

- Node.js 22 (see `.nvmrc`)
- Python 3.12+
- [uv](https://docs.astral.sh/uv/)
- GNU Make

## Getting started

```sh
make install   # install front + infra (npm) and back (uv) dependencies
make check     # lint + typecheck + test across all three tiers
```

## Per-tier commands

| Tier | Quality gate | Dev |
| --- | --- | --- |
| front | `make check-front` | `cd front && npm run dev` |
| back  | `make check-back`  | `cd back && uv run uvicorn ai_dlc_back.main:app --reload` |
| infra | `make check-infra` | `cd infra && npm run synth` |

`make check` is the canonical quality gate and runs in CI
(`.github/workflows/ci.yml`) on every push and pull request.

## Kiro CLI harness

The `.kiro/` directory configures Kiro CLI for this repository:

- `steering/` — always-on and file-scoped project conventions
- `agents/ai-dlc.json` — the primary development agent
- `skills/` — reusable interaction skills (`grill-me`, `update-spec`,
  `update-docs`, `update-plan`, `wrapup`)
- `specs/` — spec-driven development (`requirements` / `design` / `tasks`)
- `settings/mcp.json` — MCP server configuration

See `AGENTS.md` and `.kiro/steering/` for the development workflow.

## License

MIT — see `LICENSE`.
