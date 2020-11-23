"""Fixtures."""

import pytest

from library.facades import seed


@pytest.fixture
def default_seed():
    """Set the default seed."""
    name = "simple"
    value = "value 1"
    seed.get_seed().set(name=name, value=value)

    yield value

    seed.get_seed().delete(name=name)
