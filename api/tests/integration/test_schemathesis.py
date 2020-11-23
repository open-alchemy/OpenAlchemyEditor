"""Schemathesis tests."""

import contextlib

import schemathesis

from library.facades import seed
from app import app

schema = schemathesis.loaders.from_wsgi("/v1/openapi.json", app.app)


@contextlib.contextmanager
def default_seed():
    seed.get_seed().set(name="simple", value="value 1")
    yield
    seed.get_seed().delete(name="simple")


@schema.parametrize()
def test_api(case):
    """
    GIVEN case
    WHEN API is called
    THEN the expected response is returned.
    """
    with default_seed():
        response = case.call_wsgi()
        case.validate_response(response)
