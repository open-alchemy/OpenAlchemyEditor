"""Types for the seed facade."""

import typing

TSeedName = str
TSeedPath = str
TSeedNames = typing.List[TSeedName]
TSeedValue = str


class TSeed(typing.Protocol):
    """Interface for seeds."""

    def list(self) -> TSeedNames:
        """List available seeds."""
        ...

    def get(self, *, name: TSeedName) -> TSeedValue:
        """Get a seed by name."""
        ...

    def set(self, *, name: TSeedName, value: TSeedValue) -> None:
        """Set a seed name to a value."""
        ...

    def delete(self, *, name: TSeedName) -> None:
        """Delete a seed by name."""
        ...
