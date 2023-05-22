# Local application imports
from data import constants, models


def get_active_game_for_player(*, player: models.Player) -> models.Game | None:
    """
    Get the game this player is currently playing.
    """
    try:
        return models.Game.objects.get(
            player=player, status=constants.GameStatus.ACTIVE
        )
    except models.Game.DoesNotExist:
        return None


def get_non_erased_move(
    game: models.Game, *, row: int, column: int
) -> models.Move | None:
    """
    Get the move in the game in the given cell which has not been erased.
    """
    try:
        return game.moves.get(row=row, column=column, is_erased=False)
    except models.Move.DoesNotExist:
        return None
