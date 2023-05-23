# Third party imports
from rest_framework import views


class NextGame(views.APIView):
    """
    - Request payload: {difficulty}
    - Response payload: {active_game}
    Uses the sudoku serializer to retrieve the size and difficulty.
    """

    pass
