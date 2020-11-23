"""Tests for seed implementation."""

import pytest

from library.facades import seed


@pytest.mark.parametrize("seed_instance", [seed.memory.MemorySeed()])
def test_get_before_set(seed_instance):
    """
    GIVEN seed instance
    WHEN get is called
    THEN SeedNotFoundError is raised.
    """
    with pytest.raises(seed.exceptions.SeedNotFoundError):
        seed_instance.get(name="test")


@pytest.mark.parametrize("seed_instance", [seed.memory.MemorySeed()])
def test_delete_before_set(seed_instance):
    """
    GIVEN seed instance
    WHEN delete is called
    THEN.
    """
    with pytest.raises(seed.exceptions.SeedNotFoundError):
        seed_instance.delete(name="test")


@pytest.mark.parametrize("seed_instance", [seed.memory.MemorySeed()])
def test_set_get(seed_instance):
    """
    GIVEN seed instance and seed name and value
    WHEN set is called with the name and value and get is called with the name
    THEN the value is returned.
    """
    name = "name 1"
    value = "value 1"

    seed_instance.set(name=name, value=value)
    returned_seed = seed_instance.get(name=name)

    assert returned_seed == value


@pytest.mark.parametrize("seed_instance", [seed.memory.MemorySeed()])
def test_set_delete_get(seed_instance):
    """
    GIVEN seed instance and seed name and value
    WHEN set is called with the name and value and delete and then get
        is called with the name
    THEN SeedNotFoundError is raised.
    """
    name = "name 1"
    value = "value 1"

    seed_instance.set(name=name, value=value)
    seed_instance.delete(name=name)
    with pytest.raises(seed.exceptions.SeedNotFoundError):
        seed_instance.get(name="test")


@pytest.mark.parametrize("seed_instance", [seed.memory.MemorySeed()])
def test_list(seed_instance):
    """
    GIVEN seed instance and seed names and values
    WHEN list is called after none, one and multiple set calls
    THEN first no, then a single and then multiple seeds are returned.
    """
    returned_seeds = seed_instance.list()

    assert returned_seeds == []

    seed_instance.set(name="name 1", value="value 1")
    returned_seeds = seed_instance.list()

    assert returned_seeds == ["name 1"]

    seed_instance.set(name="name 2", value="value 2")
    returned_seeds = seed_instance.list()

    assert returned_seeds == ["name 1", "name 2"]
