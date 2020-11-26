"""Fixtures."""

import pytest

from library.facades import seed
from library import config


@pytest.fixture
def default_seed():
    """Set the default seed."""
    name = config.get_env().default_seed_name
    value = "value 1"
    seed.get_seed().set(name=name, value=value)

    yield name, value

    seed.get_seed().delete(name=name)


@pytest.fixture
def single_seed():
    """Puts single seed into the seed facade."""
    name = "name 1"
    value = "value 1"
    seed.get_seed().set(name=name, value=value)

    yield name, value

    seed.get_seed().delete(name=name)


@pytest.fixture
def single_seed_slash_suffix():
    """Puts single seed into the seed facade."""
    name = "name 1/"
    value = "value 1"
    seed.get_seed().set(name=name, value=value)

    yield name, value

    seed.get_seed().delete(name=name)


@pytest.fixture
def single_nested_seed():
    """Puts single seed into the seed facade."""
    name = "parent 1/name 1"
    value = "value 1"
    seed.get_seed().set(name=name, value=value)

    yield name, value

    seed.get_seed().delete(name=name)


@pytest.fixture
def multiple_seed():
    """Puts multiple seed into the seed facade."""
    name_values = [("name 1", "value 1"), ("name 2", "value 2")]
    for name, value in name_values:
        seed.get_seed().set(name=name, value=value)

    yield name_values

    for name, _ in name_values:
        seed.get_seed().delete(name=name)
