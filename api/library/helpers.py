"""Helper functions."""

import json
import typing

import yaml
from yaml import error

from . import exceptions


def load_spec(*, spec_str: str, language: str) -> typing.Dict[str, typing.Any]:
    """
    Load the spec from a string using a particular language.

    Raises LoadSpecError if loading the spec fails.

    Args:
        spec_str: The string of the spec.
        language: The language to use for loading.

    Returns:
        The loaded spec.

    """
    if language == "YAML":
        try:
            return yaml.safe_load(spec_str)
        except (error.YAMLError) as exc:
            raise exceptions.LoadSpecError("body must be valid YAML") from exc
    elif language == "JSON":
        try:
            return json.loads(spec_str)
        except json.JSONDecodeError as exc:
            raise exceptions.LoadSpecError("body must be valid JSON") from exc

    raise exceptions.LoadSpecError(
        f"unsupported language {language}, supported languages are JSON and YAML"
    )


def calculate_seed_name(path: str) -> str:
    """
    Calculate the seed name based on the path to it.

    Args:
        path: The path to the seed.

    Returns:
        The name of the seed.

    """
    suffixes = ["example-spec", "-", "/"]
    for suffix in suffixes:
        if path.endswith(suffix):
            path = path[: -len(suffix)]

    return path
