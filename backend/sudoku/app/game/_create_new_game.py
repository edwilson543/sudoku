# Local application imports
from data import models


def create_new_game(*, ip_address: str) -> models.Game:
    """
    - Completes or discards old active game if there was one
    - Gets an unsolved sudoku by querying or by generating
    - Calls the operation to make a new game
    """
    pass
