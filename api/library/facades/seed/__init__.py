"""Seed facade."""

from . import memory
from . import disk
from . import exceptions
from . import types
from ... import config


def _construct_seed() -> types.TSeed:
    """Construct the seed facade."""
    environment = config.get_env()

    if environment.stage == config.Stage.TEST:
        return memory.MemorySeed()

    if environment.stage == config.Stage.PROD:
        return disk.DiskSeed(environment.seeds_folder)

    return memory.MemorySeed()


_SEED = _construct_seed()


def get_seed() -> types.TSeed:
    """Return a facade for the seed."""
    return _SEED
