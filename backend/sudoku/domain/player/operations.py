# Local application imports
from data import models


def get_or_create_player(*, ip_address: str) -> models.Player:
    """
    Get or create a player associated with the passed IP address.
    """
    try:
        return models.Player.objects.get(ip_address=ip_address)
    except models.Player.DoesNotExist:
        return models.Player.create_new(ip_address=ip_address)
