"""Tests for structured logging setup."""

import pytest
import structlog

from ai_dlc_back.logging import configure_logging


def test_configure_logging_console_emits_event(capsys: pytest.CaptureFixture[str]) -> None:
    configure_logging("info", json_logs=False)
    structlog.get_logger().info("test.console.event", key="value")
    captured = capsys.readouterr()
    assert "test.console.event" in (captured.out + captured.err)


def test_configure_logging_json_emits_json(capsys: pytest.CaptureFixture[str]) -> None:
    configure_logging("debug", json_logs=True)
    structlog.get_logger().info("test.json.event", key="value")
    captured = capsys.readouterr()
    assert '"event": "test.json.event"' in (captured.out + captured.err)
