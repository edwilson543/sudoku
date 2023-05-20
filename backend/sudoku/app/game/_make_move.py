# Local application imports
from data import models


def make_move(*, game: models.Game, row: int, column: int, value: int) -> models.Move:
    """
    - Validate no non-erased move (call get_non_erased_move)
    - Probably makes sense to validate move correctness here, and remove the method
      on the model.
    """
    pass
