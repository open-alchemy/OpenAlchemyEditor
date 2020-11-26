"""Tests for seeds endpoint."""

from urllib import parse

from library import seeds


def test_list(single_seed):
    """
    GIVEN single seed is defined
    WHEN list is called
    THEN the defined seed name is returned.
    """
    name, _ = single_seed

    response = seeds.list_()

    assert response == [{"name": name, "path": name}]


def test_list_slash_suffix(single_seed_slash_suffix):
    """
    GIVEN single seed with a / suffix is defined
    WHEN list is called
    THEN the defined seed name is returned.
    """
    name, _ = single_seed_slash_suffix

    response = seeds.list_()

    assert response == [{"name": name[:-1], "path": name}]


def test_list_multiple(multiple_seed):
    """
    GIVEN multiple seeds are defined
    WHEN list is called
    THEN the defined seed name is returned.
    """
    response = seeds.list_()

    assert response == [{"name": name, "path": name} for name, _ in multiple_seed]


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


def test_get(single_nested_seed):
    """
    GIVEN a nested seed is defined
    WHEN get is called with the name of the seed
    THEN the seed is returned.
    """
    name, value = single_nested_seed
    quoted_name = parse.quote_plus(name)

    response = seeds.get(quoted_name)

    assert response.status_code == 200
    assert response.data.decode() == value
    assert response.mimetype == "text/plain"
