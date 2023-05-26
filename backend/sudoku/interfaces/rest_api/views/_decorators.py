# Standard library imports
import functools
from typing import Callable

# Third party imports
from rest_framework import exceptions as drf_exceptions
from rest_framework import request as drf_request
from rest_framework import views

# Django imports
from django.conf import settings


def frontend_only(view_class: type[views.APIView]) -> type[views.APIView]:
    """
    Decorator banning requests to a class-based view that did not come from the frontend.

    The wrapper is used to call `check_request_source()` before the `setup()` method of the
    decorated view class is called.
    """

    def setup_wrapper(setup_func: Callable) -> Callable:
        """Method decorator for the setup method."""

        @functools.wraps(view_class.setup)
        def setup(
            self: views.APIView,
            request: drf_request.Request,
            *args: object,
            **kwargs: object
        ) -> None:
            """Extra logic to call before the decorated classes' `setup()` method."""
            _check_request_source(request=request)
            setup_func(self, request, *args, **kwargs)

        return setup

    view_class.setup = setup_wrapper(view_class.setup)
    return view_class


def _check_request_source(request: drf_request.Request) -> None:
    """
    Raise if the request is not signed with the frontend API key.
    """
    if request.headers.get("FRONTEND_API_KEY") != settings.FRONTEND_API_KEY:
        raise drf_exceptions.PermissionDenied()
