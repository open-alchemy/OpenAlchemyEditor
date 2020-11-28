"""Tests based on schema."""

import schemathesis
from hypothesis import settings

schema = schemathesis.from_uri("https://editor.api.openalchemy.io/v1/openapi.json")


@settings(deadline=2000, max_examples=10)
@schema.parametrize()
def test_api(case):
    """
    GIVEN OpenAPI spec
    WHEN the API is called
    THEN all responses align with the OpenAPI spec.
    """
    case.call_and_validate()
