# Third party imports
from rest_framework import request as drf_request
from rest_framework import response as drf_response
from rest_framework import status as drf_status
from rest_framework import views

# Django imports
from django import shortcuts

# Local application imports
from app import game
from data import models
from interfaces.rest_api import serializers
from interfaces.rest_api.views import _decorators as decorators


@decorators.frontend_only
class EraseMove(views.APIView):
    """
    Erase a single move from a game.
    """

    # Instance vars
    game: models.Game

    def setup(
        self, request: drf_request.Request, *args: object, **kwargs: object
    ) -> None:
        super().setup(request, *args, **kwargs)
        self.game = shortcuts.get_object_or_404(klass=models.Game, id=kwargs["game_id"])

    def post(
        self, request: drf_request.Request, *args: object, **kwargs: object
    ) -> drf_response.Response:
        serializer = serializers.Move(data=request.data)
        if serializer.is_valid():
            try:
                game.erase_move(
                    game=self.game,
                    row=serializer.validated_data["row"],
                    column=serializer.validated_data["column"],
                )
            except game.MoveDoesNotExist:
                return drf_response.Response(status=drf_status.HTTP_400_BAD_REQUEST)

            return drf_response.Response(status=drf_status.HTTP_200_OK)

        return drf_response.Response(
            serializer.errors, status=drf_status.HTTP_400_BAD_REQUEST
        )
