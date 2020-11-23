"""Types for the seed facade."""

import typing

TSeedName = str
TSeedNames = typing.List[TSeedName]
TSeedValue = str


class TSeed(typing.Protocol):
    """Interface for seeds."""

    def list_seeds(self) -> TSeedNames:
        """List available seeds."""
        ...

    def get_seed(self, *, name: TSeedName) -> TSeedValue:
        """Get a seed by name."""
        ...

    def set_seed(self, *, name: TSeedName, value: TSeedValue) -> None:
        """Set a seed name to a value."""
        ...

    def delete_seed(self, *, name: TSeedName) -> None:
        """Delete a seed by name."""
        ...
