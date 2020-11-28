"""Tests for the helpers."""

import pytest
from library import exceptions, helpers

LOAD_SPEC_ERROR_TESTS = [
    pytest.param(
        "INVALID",
        "",
        exceptions.LoadSpecError,
        "unsupported language INVALID, supported languages are JSON and YAML",
        id="invalid language",
    ),
    pytest.param(
        "JSON",
        "invalid JSON",
        exceptions.LoadSpecError,
        "body must be valid JSON",
        id="invalid JSON",
    ),
    pytest.param(
        "YAML",
        "not: valid: YAML",
        exceptions.LoadSpecError,
        "body must be valid YAML",
        id="invalid YAML schema",
    ),
    pytest.param(
        "YAML",
        ":",
        exceptions.LoadSpecError,
        "body must be valid YAML",
        id="invalid YAML value",
    ),
]


@pytest.mark.parametrize(
    "language, spec_str, expected_exception, expected_reason", LOAD_SPEC_ERROR_TESTS
)
def test_load_spec_error(language, spec_str, expected_exception, expected_reason):
    """
    GIVEN language and spec string
    WHEN load_spec is called with the language and spec string
    THEN the expected exception is raised with the expected reason.
    """
    with pytest.raises(expected_exception) as exc:
        helpers.load_spec(spec_str=spec_str, language=language)

    assert str(exc.value) == expected_reason


LOAD_SPEC_TESTS = [
    pytest.param(
        "JSON",
        '{"key": "value"}',
        id="JSON",
    ),
    pytest.param(
        "YAML",
        "key: value",
        id="YAML",
    ),
]


@pytest.mark.parametrize("language, spec_str", LOAD_SPEC_TESTS)
def test_load_spec(language, spec_str):
    """
    GIVEN language and spec string
    WHEN load_spec is called with the language and spec string
    THEN the expected exception spec is returned.
    """
    returned_spec = helpers.load_spec(spec_str=spec_str, language=language)

    assert returned_spec == {"key": "value"}


CALCULATE_SEED_NAME_TESTS = [
    pytest.param("name 1", "name 1", id="plain"),
    pytest.param("name 1/", "name 1", id="ends in /"),
    pytest.param("name 1example-spec", "name 1", id="ends in example-spec"),
    pytest.param("name 1-example-spec", "name 1", id="ends in -example-spec"),
    pytest.param("name 1/example-spec", "name 1", id="ends in /example-spec"),
    pytest.param("name 1/-example-spec", "name 1", id="ends in /-example-spec"),
]


@pytest.mark.parametrize("path, expected_name", CALCULATE_SEED_NAME_TESTS)
def test_calculate_seed_name(path, expected_name):
    """
    GIVEN path
    WHEN calculate_seed_name is called with the path
    THEN the expected name is returned.
    """
    returned_name = helpers.calculate_seed_name(path)

    assert returned_name == expected_name
