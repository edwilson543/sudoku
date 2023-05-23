# Django imports
from django import urls

# Local application imports
from interfaces.rest_api import views

urlpatterns = [
    urls.path("game/active/", view=views.ActiveGame.as_view()),
    urls.path(
        "game/<int:game_id>/make-move/", view=views.MakeMove.as_view(), name="make-move"
    ),
    urls.path("game/<int:game_id>/erase-move/", view=views.EraseMove.as_view()),
    urls.path(
        "game/<int:game_id>/erase-incorect-moves/",
        view=views.EraseAllIncorrectMoves.as_view(),
    ),
    urls.path("game/next/", view=views.NextGame.as_view()),
]
