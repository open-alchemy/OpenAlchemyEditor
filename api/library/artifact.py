"""Controllers for specs."""

import json

import connexion
import flask
from open_alchemy.schemas import artifacts

from . import exceptions, helpers, types


def calculate(
    body: str,
) -> flask.Response:
    """
    Calculate the artifacts of a spec.

    Args:
        body: The spec.

    Returns:
        The artifacts.

    """
    print(body)  # allow-print
    language = connexion.request.headers["X-LANGUAGE"]

    spec: types.TSpec
    try:
        spec = helpers.load_spec(spec_str=body, language=language)
    except exceptions.LoadSpecError as exc:
        return flask.Response(str(exc), status=400, mimetype="text/plain")

    return flask.Response(
        json.dumps(artifacts.get(spec=spec)), status=200, mimetype="application/json"
    )
