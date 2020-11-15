"""Controllers for specs."""

import json
import typing

import connexion
import yaml
from yaml import parser
from yaml import scanner
from open_alchemy.schemas import validation


def validate(body: str):
    """
    Validate a spec.

    Args:
        body: The spec.

    Returns:
        The validation result.

    """
    language = connexion.request.headers["X-LANGUAGE"]

    spec: dict[str, typing.Any]
    if language == "YAML":
        try:
            spec = yaml.safe_load(body)
        except (parser.ParserError, scanner.ScannerError):
            return {"result": {"valid": False, "reason": "body must be valid YAML"}}
    else:
        try:
            spec = json.loads(body)
        except json.JSONDecodeError:
            return {"result": {"valid": False, "reason": "body must be valid JSON"}}

    return validation.check(spec=spec)
