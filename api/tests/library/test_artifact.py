"""Tests for the spec controllers."""

import json
from unittest import mock

import connexion
import pytest
from library import artifact

CALCULATE_TESTS = [
    pytest.param(
        "JSON",
        "invalid JSON",
        b"body must be valid JSON",
        400,
        id="JSON invalid schema",
    ),
    pytest.param(
        "JSON",
        '{"components": {"schemas": {}}}',
        json.dumps({"models": {}}).encode(),
        200,
        id="JSON valid",
    ),
]


@pytest.mark.parametrize(
    "language, body, expected_data, expected_status", CALCULATE_TESTS
)
def test_calculate(language, body, expected_data, expected_status, monkeypatch):
    """
    GIVEN monkeypatched header with X_LANGUAGE set and body
    WHEN calculate is called with the body
    THEN the expected result is returned.
    """
    mock_headers = {"X-LANGUAGE": language}
    mock_request = mock.Mock(spec_set=["headers"])
    mock_request.headers = mock_headers
    monkeypatch.setattr(connexion, "request", mock_request)

    response = artifact.calculate(body)

    assert response.data == expected_data
    assert response.status_code == expected_status
