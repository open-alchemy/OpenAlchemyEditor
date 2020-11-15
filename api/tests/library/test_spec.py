"""Tests for the spec controllers."""

from unittest import mock

import connexion
import pytest

from library import spec


VALIDATE_TESTS = [
    pytest.param(
        "JSON",
        "invalid JSON",
        {"result": {"valid": False, "reason": "body must be valid JSON"}},
        id="JSON invalid schema",
    ),
    pytest.param(
        "JSON",
        '{"key": "value"}',
        {"result": {"valid": False, "reason": "specification must define components"}},
        id="JSON valid",
    ),
    pytest.param(
        "YAML",
        "not: valid: YAML",
        {"result": {"valid": False, "reason": "body must be valid YAML"}},
        id="YAML invalid schema",
    ),
    pytest.param(
        "YAML",
        ":",
        {"result": {"valid": False, "reason": "body must be valid YAML"}},
        id="YAML invalid value",
    ),
    pytest.param(
        "YAML",
        "key: value",
        {"result": {"valid": False, "reason": "specification must define components"}},
        id="YAML valid",
    ),
]


@pytest.mark.parametrize("language, body, expected_result", VALIDATE_TESTS)
def test_validate(language, body, expected_result, monkeypatch):
    """
    GIVEN monkeypatched header with X_LANGUAGE set and body
    WHEN validate is called with the body
    THEN the expected result is returned.
    """
    mock_headers = {"X-LANGUAGE": language}
    mock_request = mock.Mock(spec_set=["headers"])
    mock_request.headers = mock_headers
    monkeypatch.setattr(connexion, "request", mock_request)

    returned_result = spec.validate(body)

    assert returned_result == expected_result
