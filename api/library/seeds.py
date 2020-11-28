"""Handle seeds request."""

from urllib import parse

import flask

from . import helpers
from .facades import seed


def list_() -> seed.types.TSeedNames:
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


def get(seed_id: seed.types.TSeedName) -> flask.Response:
    """
    Get the value of a seed.

    Returns:
        The seed value or a 404.

    """
    seed_name = parse.unquote_plus(seed_id)

    try:
        return flask.Response(
            seed.get_seed().get(name=seed_name), status=200, mimetype="text/plain"
        )
    except seed.exceptions.SeedNotFoundError as exc:
        return flask.Response(
            str(exc).replace(seed_name, seed_id), status=404, mimetype="text/plain"
        )
