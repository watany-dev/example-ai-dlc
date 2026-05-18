"""Application configuration sourced from environment variables."""

from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings for the example-ai-dlc backend.

    Values are read from ``AI_DLC_``-prefixed environment variables.
    """

    model_config = SettingsConfigDict(env_prefix="AI_DLC_", env_file=".env", extra="ignore")

    app_name: str = "example-ai-dlc back"
    environment: Literal["dev", "prod"] = "dev"
    log_level: Literal["debug", "info", "warning", "error"] = "info"


@lru_cache
def get_settings() -> Settings:
    """Return the process-wide settings instance."""
    return Settings()
