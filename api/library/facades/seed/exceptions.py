"""Errors for the seed facade."""

from ... import exceptions


class SeedError(exceptions.BaseError):
    """Base exception for seed errors."""


class SeedNotFoundError(SeedError):
    """Raised when a seed cannot be found."""
