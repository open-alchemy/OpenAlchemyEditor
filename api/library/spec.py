"""Controllers for specs."""

import typing

import connexion
from open_alchemy.schemas import validation

from . import exceptions, helpers


def validate_managed(body: str) -> typing.Dict[str, typing.Any]:
    """
    Validate a spec.

    Args:
        body: The spec.

    Returns:
        The validation result.

    """
    language = connexion.request.headers["X-LANGUAGE"]

    spec: dict[str, typing.Any]
    try:
        spec = helpers.load_spec(spec_str=body, language=language)
    except exceptions.LoadSpecError as exc:
        return {"result": {"valid": False, "reason": str(exc)}}

    return validation.check(spec=spec)


def validate_un_managed(body: str) -> typing.Dict[str, typing.Any]:
    """
    Validate a spec.

    Args:
        body: The spec.

    Returns:
        The validation result.

    """
    language = connexion.request.headers["X-LANGUAGE"]

    spec: dict[str, typing.Any]
    try:
        spec = helpers.load_spec(spec_str=body, language=language)
    except exceptions.LoadSpecError as exc:
        return {"result": {"valid": False, "reason": str(exc)}}

    return validation.unmanaged.check(spec=spec)
