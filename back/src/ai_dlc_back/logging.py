"""Structured logging setup built on structlog.

Routes both structlog and stdlib log records (uvicorn, FastAPI) through a
single processor chain so every line is consistently formatted.
"""

import logging
import sys

import structlog
from structlog.typing import Processor

get_logger = structlog.get_logger


def configure_logging(level: str = "info", *, json_logs: bool = False) -> None:
    """Configure structlog and bridge stdlib logging.

    Args:
        level: Minimum level name (``debug``/``info``/``warning``/``error``).
        json_logs: Emit JSON lines instead of console-formatted output.
    """
    log_level = logging.getLevelNamesMapping()[level.upper()]

    shared_processors: list[Processor] = [
        structlog.contextvars.merge_contextvars,
        structlog.stdlib.add_log_level,
        structlog.stdlib.add_logger_name,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
    ]

    structlog.configure(
        processors=[
            *shared_processors,
            structlog.stdlib.ProcessorFormatter.wrap_for_formatter,
        ],
        wrapper_class=structlog.make_filtering_bound_logger(log_level),
        logger_factory=structlog.stdlib.LoggerFactory(),
        cache_logger_on_first_use=True,
    )

    renderer: Processor = (
        structlog.processors.JSONRenderer() if json_logs else structlog.dev.ConsoleRenderer()
    )
    formatter = structlog.stdlib.ProcessorFormatter(
        foreign_pre_chain=shared_processors,
        processors=[
            structlog.stdlib.ProcessorFormatter.remove_processors_meta,
            renderer,
        ],
    )

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(formatter)

    root = logging.getLogger()
    root.handlers.clear()
    root.addHandler(handler)
    root.setLevel(log_level)
