"""Tests for the API."""

import json
from urllib import request

import pytest


@pytest.mark.parametrize(
    "url, expected_content",
    [
        pytest.param(
            "https://editor.api.openalchemy.io/v1/spec/validate-managed",
            '"result":',
            id="managed",
        ),
        pytest.param(
            "https://editor.api.openalchemy.io/v1/spec/validate-un-managed",
            '"result":',
            id="un-managed",
        ),
        pytest.param(
            "https://editor.api.openalchemy.io/v1/artifact/calculate",
            '"artifacts":',
            id="artifact",
        ),
    ],
)
def test_spec_endpoint(url, spec_str, expected_content):
    """
    GIVEN spec string with managed and unmanaged schemas, endpoint and language
    WHEN the spec str is posted to the endpoint with the language in the header
    THEN no errors are returned.
    """
    test_request = request.Request(
        url,
        data=spec_str.value.encode(),
        headers={
            "X-LANGUAGE": spec_str.language,
            "Content-Type": "text/plain",
        },
        method="POST",
    )

    with request.urlopen(test_request) as response:
        assert response.status == 200
        response_data = response.read().decode()
        assert expected_content in response_data


def test_seed():
    """
    GIVEN
    WHEN /seed is requested
    THEN the seed is returned.
    """
    test_request = request.Request(
        "https://editor.api.openalchemy.io/v1/seed", method="GET"
    )

    with request.urlopen(test_request) as response:
        assert response.status == 200
        response_data = response.read().decode()
        assert "components:" in response_data


def test_seeds():
    """
    GIVEN
    WHEN /seeds and /seeds/{path} are requested
    THEN the all available seeds and individual seeds are returned.
    """
    test_request = request.Request(
        "https://editor.api.openalchemy.io/v1/seeds", method="GET"
    )

    with request.urlopen(test_request) as response:
        assert response.status == 200
        response_data = response.read().decode()
        seeds = json.loads(response_data)
        assert isinstance(seeds, list)
        assert seeds

    for seed in seeds:
        assert "name" in seed
        assert "path" in seed
        path = seed["path"]

        test_request = request.Request(
            f"https://editor.api.openalchemy.io/v1/seeds/{path}", method="GET"
        )

        with request.urlopen(test_request) as response:
            assert response.status == 200
            response_data = response.read().decode()
            assert "components:" in response_data
