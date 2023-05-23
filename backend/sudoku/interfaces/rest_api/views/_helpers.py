# Third party imports
from rest_framework import exceptions as drf_exceptions

# Django imports
from django import http
from django.conf import settings


def check_request_source(request: http.HttpRequest) -> None:
    """
    Restrict the consumers of the REST API to the frontend.
    """
    if request.headers.get("FRONTEND_API_KEY") != settings.FRONTEND_API_KEY:
        raise drf_exceptions.PermissionDenied()
