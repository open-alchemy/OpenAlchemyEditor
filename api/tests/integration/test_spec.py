"""Tests for spec controller."""

import json


def test_validate(client):
    """
    GIVEN language and spec
    WHEN POST /v1/spec/validate is called with the language header and spec body
    THEN a 200 response with a valid result is returned.
    """
    language = "YAML"
    spec = ""

    respose = client.post(
        "/v1/spec/validate", headers={"X-LANGUAGE": language}, data=spec
    )

    assert respose.status_code == 200
    assert json.loads(respose.data.decode()) == {"result": {"valid": True}}
