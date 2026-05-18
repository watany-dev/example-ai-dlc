"""FastAPI application entrypoint for the example-ai-dlc backend."""

from fastapi import FastAPI

app = FastAPI(title="example-ai-dlc back")


@app.get("/health")
def health() -> dict[str, str]:
    """Liveness probe consumed by infra health checks and monitoring."""
    return {"status": "ok"}
