"""Seed facade."""

from . import memory
from . import disk
from . import exceptions
from . import types


def _construct_seed() -> types.TSeed:
    """Construct the seed facade."""
    return memory.MemorySeed()


_SEED = _construct_seed()


def get_seed() -> types.TSeed:
    """Return a facade for the seed."""
    return _SEED
