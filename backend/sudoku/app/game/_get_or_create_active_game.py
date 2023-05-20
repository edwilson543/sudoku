# Local application imports
from data import models


def get_or_create_active_game(*, ip_address: str) -> models.Game:
    """
    - Get the player
    - Query for active game
    - Create active game if necessary
        - get or create unattempted sudoku
        - call factory directly models.Game.create_new(player=player, sudoku=sudoku)
    """
    pass
