"""Configuration."""

import dataclasses
import enum
import os
import pathlib


class Stage(str, enum.Enum):
    """The stage the API is running in."""

    TEST = "TEST"
    PROD = "PROD"


_STAGES = {item.value for item in Stage}


@dataclasses.dataclass
class TEnvironment:
    """The environment variables."""

    # The stage the application is running in
    stage: Stage
    # The folder of the seeds
    seeds_folder: str
    # The name of the default seed
    default_seed_name: str
    # The CORS response
    access_control_allow_origin: str


def _get_env() -> TEnvironment:
    """Read environment variables."""
    stage = os.getenv("STAGE", Stage.TEST)
    assert isinstance(stage, str)
    assert stage in _STAGES

    seeds_folder = os.getenv(
        "SEEDS_FOLDER", str(pathlib.Path(".") / "assets" / "seeds")
    )
    assert isinstance(stage, str)

    default_seed_name = os.getenv("DEFAULT_SEED_NAME", "default-seed")
    assert isinstance(default_seed_name, str)

    access_control_allow_origin = os.getenv("ACCESS_CONTROL_ALLOW_ORIGIN", "*")
    assert isinstance(access_control_allow_origin, str)

    return TEnvironment(
        stage=stage,
        seeds_folder=seeds_folder,
        default_seed_name=default_seed_name,
        access_control_allow_origin=access_control_allow_origin,
    )


_ENVIRONMENT = _get_env()


def get_env() -> TEnvironment:
    """
    Get the value of environment variables.

    Returns:
        The environment variables.

    """
    return _ENVIRONMENT
