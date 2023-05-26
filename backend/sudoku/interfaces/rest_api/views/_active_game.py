# Third party imports
from rest_framework import request as drf_request
from rest_framework import response as drf_response
from rest_framework import status as drf_status
from rest_framework import views

# Local application imports
from app import game
from interfaces.rest_api import serializers
from interfaces.rest_api.views import _decorators as decorators


@decorators.frontend_only
class ActiveGame(views.APIView):
    """
    Get or create an active sudoku game for an IP address.
    """

    def post(
        self, request: drf_request, *args: object, **kwargs: object
    ) -> drf_response.Response:
        """
        Create a new game, or get the active game, for a player.
        """
        initiation_data = serializers.GameInitiation(data=request.data)

        if initiation_data.is_valid():
            try:
                active_game = game.get_or_create_active_game(
                    ip_address=initiation_data.validated_data["ip_address"],
                    size=initiation_data.validated_data["size"],
                    difficulty=initiation_data.validated_data["difficulty"],
                )
            except game.UnableToCreateSudoku:
                return drf_response.Response(
                    request.data, status=drf_status.HTTP_504_GATEWAY_TIMEOUT
                )
            serialized_game = serializers.Game(instance=active_game)
            return drf_response.Response(
                serialized_game.data, status=drf_status.HTTP_200_OK
            )

        return drf_response.Response(
            initiation_data.errors, status=drf_status.HTTP_400_BAD_REQUEST
        )
