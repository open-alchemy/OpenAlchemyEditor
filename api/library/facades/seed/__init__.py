"""Seed facade."""

from ... import config
from . import disk, exceptions, memory, types


def _construct_seed() -> types.TSeed:
    """Construct the seed facade."""
    environment = config.get_env()

    if environment.stage == config.Stage.TEST:
        return memory.MemorySeed()

    if environment.stage == config.Stage.PROD:
        return disk.DiskSeed(environment.seeds_folder)

    raise AssertionError(f"unsupported stage {environment.stage}")


_SEED = _construct_seed()


def get_seed() -> types.TSeed:
    """Return a facade for the seed."""
    return _SEED
