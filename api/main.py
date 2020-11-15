"""Main function for lambda."""

import serverless_wsgi

import app


def handler(event, context):
    """Handle request."""
    serverless_wsgi.handle_request(app.app, event, context)
