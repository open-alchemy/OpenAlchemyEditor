"""Disk implementation for the seed facade."""

import pathlib

from . import exceptions
from . import types


class DiskSeed:
    """Interface for seeds."""

    def __init__(self, path: str) -> None:
        """Construct."""
        self._base_path = pathlib.Path(path)

    @staticmethod
    def _get_file_name(name: types.TSeedName) -> str:
        """Get the file name."""
        return f"{name}.yml"

    def list(self) -> types.TSeedNames:
        """List available seeds."""
        base_path_len = len(self._base_path.as_posix())
        return list(
            map(
                lambda match: match.as_posix()[base_path_len + 1 : -len(match.suffix)],
                self._base_path.glob("**/*.yml"),
            )
        )

    def get(self, *, name: types.TSeedName) -> types.TSeedValue:
        """Get a seed by name."""
        if not (self._base_path / self._get_file_name(name)).exists():
            raise exceptions.SeedNotFoundError(f"could not find seed {name}")
        return (self._base_path / self._get_file_name(name)).read_text()

    def set(self, *, name: types.TSeedName, value: types.TSeedValue) -> None:
        """Set a seed name to a value."""
        (self._base_path / self._get_file_name(name)).write_text(value)

    def delete(self, *, name: types.TSeedName) -> None:
        """Delete a seed by name."""
        if not (self._base_path / self._get_file_name(name)).exists():
            raise exceptions.SeedNotFoundError(f"could not find seed {name}")
        (self._base_path / self._get_file_name(name)).unlink()
