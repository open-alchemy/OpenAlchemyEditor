"""Tests for seeds endpoint."""

from library import seeds


def test_list(single_seed):
    """
    GIVEN single seed is defined
    WHEN list is called
    THEN the defined seed name is returned.
    """
    name, _ = single_seed

    response = seeds.list()

    assert response == [name]


def test_get_miss():
    """
    GIVEN no seeds are defined
    WHEN get is called with a name
    THEN a 404 is returned.
    """
    name = "seed 1"

    response = seeds.get(name)

    assert response.status_code == 404
    assert name in response.data.decode()
    assert response.mimetype == "text/plain"


def test_get(single_seed):
    """
    GIVEN a seed is defined
    WHEN get is called with the name of the seed
    THEN the seed is returned.
    """
    name, value = single_seed

    response = seeds.get(name)

    assert response.status_code == 200
    assert response.data.decode() == value
    assert response.mimetype == "text/plain"
