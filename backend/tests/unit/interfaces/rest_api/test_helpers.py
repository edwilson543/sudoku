# Standard library imports
from typing import Callable

# Third party imports
import pytest
from rest_framework import exceptions as drf_exceptions
from rest_framework import request as drf_request
from rest_framework import response as drf_response
from rest_framework import test as drf_test
from rest_framework import views

# Django imports
from django import test as django_test

# Local application imports
from interfaces.rest_api.views import _decorators as decorators


class TestRequestSource:
    @pytest.fixture
    def view(self) -> Callable[[drf_request.Request], drf_response.Response]:
        @decorators.frontend_only
        class View(views.APIView):
            pass

        return View.as_view()

    @django_test.override_settings(FRONTEND_API_KEY="key")
    def test_does_not_raise_if_frontend_key_in_request_headers(
        self, view: Callable[[drf_request.Request], drf_response.Response]
    ):
        request_factory = drf_test.APIRequestFactory()
        headers = {"HTTP_FRONTEND_API_KEY": "key"}
        request = request_factory.request(**headers)

        view(request=request)

    @django_test.override_settings(FRONTEND_API_KEY="key")
    def test_raises_if_incorrect_frontend_key_in_request_headers(
        self, view: Callable[[drf_request.Request], drf_response.Response]
    ):
        request_factory = drf_test.APIRequestFactory()
        headers = {"HTTP_FRONTEND_API_KEY": "wrong-key"}
        request = request_factory.request(**headers)

        with pytest.raises(drf_exceptions.PermissionDenied):
            view(request=request)

    def test_raises_if_no_frontend_key_in_request_headers(
        self, view: Callable[[drf_request.Request], drf_response.Response]
    ):
        request_factory = drf_test.APIRequestFactory()
        request = request_factory.request()

        with pytest.raises(drf_exceptions.PermissionDenied):
            view(request=request)
