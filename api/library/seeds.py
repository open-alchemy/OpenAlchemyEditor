"""Handle seeds request."""

import typing
from urllib import parse

import flask

from . import helpers
from .facades import seed


class _TSeedNamePath(typing.TypedDict, total=True):
    """A seed name-value pair."""

    name: seed.types.TSeedName
    path: str


def list_() -> typing.List[_TSeedNamePath]:
    """
    Get all available seeds.

    Returns:
        All available seeds.

    """
    return list(
        map(
            lambda path: {"name": helpers.calculate_seed_name(path), "path": path},
            seed.get_seed().list(),
        )
    )


def get(seed_path: seed.types.TSeedName) -> flask.Response:
    """
    Get the value of a seed.

    Returns:
        The seed value or a 404.

    """
    seed_name = parse.unquote_plus(seed_path)

    try:
        return flask.Response(
            seed.get_seed().get(name=seed_name), status=200, mimetype="text/plain"
        )
    except seed.exceptions.SeedNotFoundError as exc:
        return flask.Response(
            str(exc).replace(seed_name, seed_path), status=404, mimetype="text/plain"
        )
