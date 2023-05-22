# Third party imports
import pytest

# Local application imports
from data import models
from domain.player import operations
from tests import factories


@pytest.mark.django_db
class TestGetOrCreatePlayer:
    def test_gets_player_when_ip_address_already_registered(self):
        player = factories.Player()

        player_in_db = operations.get_or_create_player(ip_address=player.ip_address)

        assert player_in_db == player

    def test_creates_player_when_ip_address_not_registered(self):
        ip_address = "something"

        operations.get_or_create_player(ip_address=ip_address)

        player = models.Player.objects.get()
        assert player.ip_address == ip_address
