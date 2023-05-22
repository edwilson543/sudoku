# Django imports
from django.db import transaction

# Local application imports
from data import constants, models
from domain.game import operations as game_operations
from domain.game import queries as game_queries
from domain.sudoku import operations as sudoku_operations


class PlayerHasNoActiveGame(Exception):
    def __init__(self, ip_address: str):
        super().__init__(
            f"Tried to create a new game for ip address {ip_address} which has no active game"
        )


@transaction.atomic
def create_next_game(
    *, ip_address: str, difficulty: constants.SudokuDifficulty, size: int
) -> models.Game:
    """
    Create a new game with a fresh sudoku for the player at the given ip address.

    This is for continuation of an existing player who has already played.

    :raises Player.DoesNotExist: If the ip_address is not already registered to a player.
    :raises PlayerHasNoActiveGame: If the player has no active game (this scenario should
        not arise however, since a player and their first game are created atomically.)
    :raises UnableToCreateSudoku: If a sudoku could not be created.
    """
    player = models.Player.objects.get(ip_address=ip_address)

    # Terminate the player's active game
    if active_game := game_queries.get_active_game_for_player(player=player):
        game_operations.terminate_game(game=active_game)
    else:
        raise PlayerHasNoActiveGame(ip_address=ip_address)

    # Create a new game for the player
    sudoku = sudoku_operations.get_or_create_unattempted_sudoku_for_player(
        player=player, difficulty=difficulty, size=size
    )
    return models.Game.create_new(player=player, sudoku=sudoku)
