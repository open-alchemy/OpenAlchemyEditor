"""Tests for spec controller."""

import pytest

import json


POST_TESTS = [
    pytest.param(
        "/v1/spec/validate-managed",
        "",
        {"X-LANGUAGE": "YAML"},
        {"result": {"valid": False, "reason": "specification must be a dictionary"}},
        id="/v1/spec/validate-managed",
    ),
    pytest.param(
        "/v1/spec/validate-un-managed",
        "",
        {"X-LANGUAGE": "YAML"},
        {"result": {"valid": False, "reason": "specification must be a dictionary"}},
        id="/v1/spec/validate-un-managed",
    ),
    pytest.param(
        "/v1/artifact/calculate",
        "",
        {"X-LANGUAGE": "YAML"},
        {},
        id="/v1/artifact/calculate",
    ),
]


@pytest.mark.parametrize("path, data, headers, expected_result", POST_TESTS)
def test_endpoint(client, path, data, headers, expected_result):
    """
    GIVEN data and headers
    WHEN POST /endpoint is called with the language header and spec body
    THEN a 200 response with the expected result is returned.
    """

    respose = client.post(path, headers=headers, data=data)

    assert respose.status_code == 200
    assert json.loads(respose.data.decode()) == expected_result


def test_seed_get(client, default_seed):
    """
    GIVEN default seed is set
    WHEN GET /seed is called
    THEN the default seed is returned.
    """
    _, value = default_seed

    respose = client.get("/v1/seed")

    assert respose.status_code == 200
    assert respose.data.decode() == value


def test_seeds_get(client, single_seed):
    """
    GIVEN default seed is set
    WHEN GET /seed is called
    THEN the default seed is returned.
    """
    name, _ = single_seed

    respose = client.get("/v1/seeds")

    assert respose.status_code == 200
    assert json.loads(respose.data.decode()) == [name]
