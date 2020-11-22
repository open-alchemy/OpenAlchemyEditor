"""Tests based on schema."""

from hypothesis import settings
import schemathesis

schema = schemathesis.from_uri("https://editor-v2.api.openalchemy.io/v1/openapi.json")


@settings(deadline=2000, max_examples=10)
@schema.parametrize()
def test_api(case):
    case.call_and_validate()
