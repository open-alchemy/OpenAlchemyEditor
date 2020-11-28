"""Tests for the spec controllers."""

from unittest import mock

import connexion
import pytest
from library import spec

VALIDATE_MANAGED_TESTS = [
    pytest.param(
        "JSON",
        "invalid JSON",
        {"result": {"valid": False, "reason": "body must be valid JSON"}},
        id="JSON invalid schema",
    ),
    pytest.param(
        "JSON",
        '{"components": {"schemas": {}}}',
        {
            "result": {
                "valid": False,
                "reason": (
                    "specification must define at least 1 schema with the x-tablename "
                    "key"
                ),
            }
        },
        id="JSON valid",
    ),
]


@pytest.mark.parametrize("language, body, expected_result", VALIDATE_MANAGED_TESTS)
def test_validate_managed(language, body, expected_result, monkeypatch):
    """
    GIVEN monkeypatched header with X_LANGUAGE set and body
    WHEN validate_managed is called with the body
    THEN the expected result is returned.
    """
    mock_headers = {"X-LANGUAGE": language}
    mock_request = mock.Mock(spec_set=["headers"])
    mock_request.headers = mock_headers
    monkeypatch.setattr(connexion, "request", mock_request)

    returned_result = spec.validate_managed(body)

    assert returned_result == expected_result


VALIDATE_UN_MANAGED_TESTS = [
    pytest.param(
        "JSON",
        "invalid JSON",
        {"result": {"valid": False, "reason": "body must be valid JSON"}},
        id="JSON invalid schema",
    ),
    pytest.param(
        "JSON",
        '{"components": {"schemas": {}}}',
        {"models": {}, "result": {"valid": True}},
        id="JSON valid",
    ),
]


@pytest.mark.parametrize("language, body, expected_result", VALIDATE_UN_MANAGED_TESTS)
def test_validate_un_managed(language, body, expected_result, monkeypatch):
    """
    GIVEN monkeypatched header with X_LANGUAGE set and body
    WHEN validate_un_managed is called with the body
    THEN the expected result is returned.
    """
    mock_headers = {"X-LANGUAGE": language}
    mock_request = mock.Mock(spec_set=["headers"])
    mock_request.headers = mock_headers
    monkeypatch.setattr(connexion, "request", mock_request)

    returned_result = spec.validate_un_managed(body)

    assert returned_result == expected_result
