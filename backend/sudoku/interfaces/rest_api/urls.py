# Django imports
from django import urls

# Local application imports
from interfaces.rest_api import views

urlpatterns = [
    urls.path("game/active/", view=views.ActiveGame.as_view(), name="active-game"),
    urls.path(
        "game/<int:game_id>/make-move/", view=views.MakeMove.as_view(), name="make-move"
    ),
    urls.path(
        "game/<int:game_id>/undo-last-move/",
        view=views.UndoLastMove.as_view(),
        name="undo-last-move",
    ),
    urls.path(
        "game/<int:game_id>/erase-all-incorect-moves/",
        view=views.EraseAllIncorrectMoves.as_view(),
        name="erase-all-incorrect-moves",
    ),
    urls.path("game/next/", view=views.CreateNextGame.as_view(), name="next-game"),
]
