"""Handle seed endpoints."""

import flask

from .facades import seed


def get() -> flask.Response:
    """
    Get the default seed.

    Returns:
        The default seed or a server error.

    """
    try:
        return flask.Response(
            seed.get_seed().get(name="simple/example-spec"),
            status=200,
            mimetype="text/plain",
        )
    except seed.exceptions.SeedNotFoundError as exc:
        return flask.Response(str(exc), status=500, mimetype="text/plain")
