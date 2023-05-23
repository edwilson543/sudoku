# Third party imports
from rest_framework import views


class MakeMove(views.APIView):
    """
    POST
    - Request payload:
    - {ip_address, game_id, row, column, value}
    - Response payload: {}
    """

    pass
