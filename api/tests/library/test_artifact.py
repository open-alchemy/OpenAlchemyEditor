"""Tests for the spec controllers."""

from unittest import mock

import connexion
import pytest

from library import artifact


CALCULATE_TESTS = [
    pytest.param(
        "JSON",
        "invalid JSON",
        "body must be valid JSON",
        400,
        id="JSON invalid schema",
    ),
    pytest.param(
        "JSON",
        '{"components": {"schemas": {}}}',
        {"models": {}},
        200,
        id="JSON valid",
    ),
]


@pytest.mark.parametrize(
    "language, body, expected_result, expected_status", CALCULATE_TESTS
)
def test_calculate(language, body, expected_result, expected_status, monkeypatch):
    """
    GIVEN monkeypatched header with X_LANGUAGE set and body
    WHEN calculate is called with the body
    THEN the expected result is returned.
    """
    mock_headers = {"X-LANGUAGE": language}
    mock_request = mock.Mock(spec_set=["headers"])
    mock_request.headers = mock_headers
    monkeypatch.setattr(connexion, "request", mock_request)

    returned_result, returned_status = artifact.calculate(body)

    assert returned_result == expected_result
    assert returned_status == expected_status
