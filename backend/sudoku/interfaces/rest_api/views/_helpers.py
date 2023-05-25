# Third party imports
from rest_framework import exceptions as drf_exceptions
from rest_framework import request as drf_request

# Django imports
from django.conf import settings


def check_request_source(request: drf_request.Request) -> None:
    """
    Restrict the consumers of the REST API to the frontend.
    """
    if request.headers.get("FRONTEND_API_KEY") != settings.FRONTEND_API_KEY:
        raise drf_exceptions.PermissionDenied()
