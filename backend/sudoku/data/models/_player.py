from __future__ import annotations

# Django imports
from django.db import models as django_models


class Player(django_models.Model):
    """
    Someone who has at some point played sudoku using the app.
    """

    ip_address = django_models.CharField(unique=True, max_length=128)
    """
    Someone who has played sudoku at least once.

    This is used for simplicity so that no auth interface is required.
    """

    created_at = django_models.DateTimeField(auto_now_add=True)
    """
    When the player first visited the site.
    """

    # ----------
    # Factories
    # ----------

    @classmethod
    def create_new(cls, *, ip_address: str) -> Player:
        return cls.objects.create(ip_address=ip_address)
