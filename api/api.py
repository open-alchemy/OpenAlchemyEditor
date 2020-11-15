"""Main function for lambda."""

import serverless_wsgi

import app


def main(event, context):
    """Handle request."""
    return serverless_wsgi.handle_request(app.app, event, context)
