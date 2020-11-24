"""Tests for seed implementation."""

import pytest

from library.facades import seed


def get_before_set(seed_instance):
    """
    GIVEN seed instance
    WHEN get is called
    THEN SeedNotFoundError is raised.
    """
    with pytest.raises(seed.exceptions.SeedNotFoundError):
        seed_instance.get(name="test")


def test_get_before_set_memory():
    """
    GIVEN memory seed instance
    """
    get_before_set(seed.memory.MemorySeed())


def test_get_before_set_disk(tmp_path):
    """
    GIVEN disk seed instance
    """
    get_before_set(seed.disk.DiskSeed(str(tmp_path)))


def delete_before_set(seed_instance):
    """
    GIVEN seed instance
    WHEN delete is called
    THEN.
    """
    with pytest.raises(seed.exceptions.SeedNotFoundError):
        seed_instance.delete(name="test")


def test_delete_before_set_memory():
    """
    GIVEN memory seed instance
    """
    delete_before_set(seed.memory.MemorySeed())


def test_delete_before_set_disk(tmp_path):
    """
    GIVEN disk seed instance
    """
    delete_before_set(seed.disk.DiskSeed(str(tmp_path)))


def set_get(seed_instance):
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


def test_set_get_memory():
    """
    GIVEN memory seed instance
    """
    set_get(seed.memory.MemorySeed())


def test_set_get_disk(tmp_path):
    """
    GIVEN disk seed instance
    """
    set_get(seed.disk.DiskSeed(str(tmp_path)))


def set_delete_get(seed_instance):
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
        seed_instance.get(name=name)


def test_set_delete_get_memory():
    """
    GIVEN memory seed instance
    """
    set_delete_get(seed.memory.MemorySeed())


def test_set_delete_get_disk(tmp_path):
    """
    GIVEN disk seed instance
    """
    set_delete_get(seed.disk.DiskSeed(str(tmp_path)))


def list(seed_instance):
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


def test_list_memory():
    """
    GIVEN memory seed instance
    """
    list(seed.memory.MemorySeed())


def test_list_disk(tmp_path):
    """
    GIVEN disk seed instance
    """
    list(seed.disk.DiskSeed(str(tmp_path)))


def test_disk_existing(tmp_path):
    """
    GIVEN disk seed instance and disk that has a seed
    WHEN list is called
    THEN the seed name is returned.
    """
    name = "seed 1"
    (tmp_path / f"{name}.yml").write_text("value 1")

    seed_instance = seed.disk.DiskSeed(str(tmp_path))
    returned_seeds = seed_instance.list()

    assert returned_seeds == [name]


def test_disk_existing_sub_folder(tmp_path):
    """
    GIVEN disk seed instance and disk that has a seed in a sub folder
    WHEN list is called
    THEN the seed name with the folder name is returned.
    """
    name = "seed 1"
    (tmp_path / "sub_folder").mkdir()
    (tmp_path / "sub_folder" / f"{name}.yml").write_text("value 1")

    seed_instance = seed.disk.DiskSeed(str(tmp_path))
    returned_seeds = seed_instance.list()

    assert returned_seeds == [f"sub_folder/{name}"]
