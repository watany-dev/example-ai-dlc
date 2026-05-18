# Cross-language quality gate for the example-ai-dlc monorepo.
# `make check` mirrors CI: lint + typecheck + test across front / back / infra.
.PHONY: install check check-front check-back check-infra build clean

install:
	npm install
	cd back && uv sync

check: check-front check-back check-infra

check-front:
	cd front && npm run lint && npm run typecheck && npm test && npm run build

check-back:
	cd back && uv run ruff format --check . && uv run ruff check . && uv run mypy src && uv run pytest

check-infra:
	cd infra && npm run typecheck && npm test && npm run synth

build:
	cd front && npm run build
	cd infra && npm run build

clean:
	rm -rf front/node_modules front/dist infra/node_modules infra/cdk.out \
		back/.venv node_modules
