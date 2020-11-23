"""Handle seeds request."""

from .facades import seed


def list() -> seed.types.TSeedNames:
    """
    Get all available seeds.

    Returns:
        All available seeds.

    """
    return seed.get_seed().list()
