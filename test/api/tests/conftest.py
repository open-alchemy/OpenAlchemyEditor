"""Fixtures for the API."""

# pylint: disable=redefined-outer-name

import json
import typing

import pytest
import yaml


@pytest.fixture()
def spec():
    """A spec with managed and un managed schemas."""
    version = "1"
    title = "title 1"
    description = "description 1"
    spec = {
        "info": {
            "title": title,
            "description": description,
            "version": version,
        },
        "components": {
            "schemas": {
                "Schema1": {
                    "type": "object",
                    "x-tablename": "schema_1",
                    "properties": {"id": {"type": "integer"}},
                },
                "Schema2": {
                    "type": "object",
                    "properties": {"id": {"type": "integer"}},
                },
            }
        },
    }

    yield spec


class SpecStr(typing.NamedTuple):
    """
    Information about a string representation of a spec.

    Attrs:
        value: The value of the spec.
        language: The language of the representation.

    """

    value: str
    language: str


@pytest.fixture(params=[(json.dumps, "JSON"), (yaml.dump, "YAML")])
def spec_str(spec, request):
    """A JSON representation of the spec."""
    dump_func, language = request.param
    yield SpecStr(value=dump_func(spec), language=language)
