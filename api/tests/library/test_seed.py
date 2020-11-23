"""Tests for the seed endpoint."""

from library import seed
from library.facades import seed as seed_facade


def test_get_error():
    """
    GIVEN empty seed instance
    WHEN get is called
    THEN a 500 is returned.
    """
    response = seed.get()

    assert b"simple" in response.data
    assert response.status_code == 500
    assert response.mimetype == "text/plain"


def test_get():
    """
    GIVEN seed instance with the simple seed
    WHEN get is called
    THEN a 200 with the seed is returned.
    """
    value = "seed 1"
    seed_facade.get_seed().set(name="simple", value=value)

    response = seed.get()

    assert response.data == value.encode()
    assert response.status_code == 200
    assert response.mimetype == "text/plain"
