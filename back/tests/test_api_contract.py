"""OpenAPI contract tests driven by schemathesis.

Generates requests from the FastAPI-produced OpenAPI schema and asserts every
response conforms to it -- the front/back contract steering doc relies on.
"""

import schemathesis

from ai_dlc_back.main import app

schema = schemathesis.openapi.from_asgi("/openapi.json", app)


@schema.parametrize()
def test_api_contract(case: schemathesis.Case) -> None:
    case.call_and_validate()
