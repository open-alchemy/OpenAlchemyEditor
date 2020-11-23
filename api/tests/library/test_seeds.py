"""Tests for seeds endpoint."""

from library import seeds
from library.facades import seed


def test_get(single_seed):
    """
    GIVEN single seed is defined
    WHEN list is called
    THEN the defined seed name is returned.
    """
    name, _ = single_seed

    response = seeds.list()

    assert response == [name]
