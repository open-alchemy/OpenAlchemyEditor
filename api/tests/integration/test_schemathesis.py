"""Schemathesis tests."""

import connexion
import schemathesis

from app import app

schema = schemathesis.loaders.from_wsgi("/v1/openapi.json", app.app)


@schema.parametrize()
def test_api(case):
    response = case.call_wsgi()
    case.validate_response(response)
