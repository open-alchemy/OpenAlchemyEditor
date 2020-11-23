"""Controllers for specs."""

import typing

import connexion
from open_alchemy.schemas import artifacts

from . import exceptions
from . import helpers


def calculate(
    body: str,
) -> typing.Tuple[typing.Union[str, typing.Dict[str, typing.Any]], int]:
    """
    Calculate the artifacts of a spec.

    Args:
        body: The spec.

    Returns:
        The artifacts.

    """
    language = connexion.request.headers["X-LANGUAGE"]

    spec: dict[str, typing.Any]
    try:
        spec = helpers.load_spec(spec_str=body, language=language)
    except exceptions.LoadSpecError as exc:
        return str(exc), 400

    return artifacts.get(spec=spec), 200
