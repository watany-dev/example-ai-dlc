"""FastAPI application entrypoint for the example-ai-dlc backend."""

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from ai_dlc_back.config import get_settings
from ai_dlc_back.logging import configure_logging, get_logger

logger = get_logger()


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    """Configure logging once at application startup."""
    settings = get_settings()
    configure_logging(settings.log_level, json_logs=settings.environment == "prod")
    logger.info("backend.startup", environment=settings.environment)
    yield


app = FastAPI(title=get_settings().app_name, lifespan=lifespan)


@app.get("/health")
def health() -> dict[str, str]:
    """Liveness probe consumed by infra health checks and monitoring."""
    logger.info("health.checked")
    return {"status": "ok"}
