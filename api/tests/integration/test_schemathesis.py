"""Schemathesis tests."""

import contextlib

import schemathesis
from app import app
from library import config
from library.facades import seed

schema = schemathesis.loaders.from_wsgi("/v1/openapi.json", app.app)


@contextlib.contextmanager
def default_seed():
    name = config.get_env().default_seed_name
    seed.get_seed().set(name=name, value="value 1")
    yield
    seed.get_seed().delete(name=name)


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
