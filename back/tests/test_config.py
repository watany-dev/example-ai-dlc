"""Tests for application settings."""

import pytest
from hypothesis import given
from hypothesis import strategies as st
from pydantic import ValidationError

from ai_dlc_back.config import Settings, get_settings

VALID_LOG_LEVELS = {"debug", "info", "warning", "error"}


def test_settings_defaults() -> None:
    settings = Settings()
    assert settings.app_name == "example-ai-dlc back"
    assert settings.environment == "dev"
    assert settings.log_level == "info"


def test_settings_env_override(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("AI_DLC_LOG_LEVEL", "debug")
    monkeypatch.setenv("AI_DLC_ENVIRONMENT", "prod")
    settings = Settings()
    assert settings.log_level == "debug"
    assert settings.environment == "prod"


def test_get_settings_is_cached() -> None:
    assert get_settings() is get_settings()


@given(value=st.text())
def test_settings_log_level_validation(value: str) -> None:
    if value in VALID_LOG_LEVELS:
        assert Settings(log_level=value).log_level == value
    else:
        with pytest.raises(ValidationError):
            Settings(log_level=value)
