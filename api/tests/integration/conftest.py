"""Fixtures for API."""

import pytest
import connexion


@pytest.fixture(scope="module")
def client():
    """Create test client for app."""
    flask_app = connexion.FlaskApp(__name__, specification_dir="../../openapi/")
    flask_app.add_api("editor.yaml")

    with flask_app.app.test_client() as test_client:
        yield test_client
