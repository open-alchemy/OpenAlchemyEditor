"""Disk implementation for the seed facade."""

import pathlib

from . import exceptions
from . import types


class DiskSeed:
    """Interface for seeds."""

    def __init__(self, path: str) -> None:
        """Construct."""
        self.path = pathlib.Path(path)

    @staticmethod
    def _get_file_name(name: types.TSeedName) -> str:
        """Get the file name."""
        return f"{name}.yml"

    def list(self) -> types.TSeedNames:
        """List available seeds."""
        return list(map(lambda match: match.stem, self.path.glob("*.yml")))

    def get(self, *, name: types.TSeedName) -> types.TSeedValue:
        """Get a seed by name."""
        if not (self.path / self._get_file_name(name)).exists():
            raise exceptions.SeedNotFoundError(f"could not find seed {name}")
        return (self.path / self._get_file_name(name)).read_text()

    def set(self, *, name: types.TSeedName, value: types.TSeedValue) -> None:
        """Set a seed name to a value."""
        (self.path / self._get_file_name(name)).write_text(value)

    def delete(self, *, name: types.TSeedName) -> None:
        """Delete a seed by name."""
        if not (self.path / self._get_file_name(name)).exists():
            raise exceptions.SeedNotFoundError(f"could not find seed {name}")
        (self.path / self._get_file_name(name)).unlink()
