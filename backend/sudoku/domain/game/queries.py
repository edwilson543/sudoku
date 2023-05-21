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
