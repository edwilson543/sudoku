# Standard library imports
from unittest import mock

# Third party imports
import pytest
from rest_framework import exceptions as drf_exceptions

# Django imports
from django import test as django_test

# Local application imports
from interfaces.rest_api.views import _helpers as helpers


class TestCheckRequestSource:
    @django_test.override_settings(FRONTEND_API_KEY="key")
    def test_does_not_raise_for_correct_frontend_key(self):
        request = mock.Mock()
        request.headers = {"FRONTEND_API_KEY": "key"}

        helpers.check_request_source(request=request)

    @django_test.override_settings(FRONTEND_API_KEY="key")
    def test_does_not_raise_for_incorrect_frontend_key(self):
        request = mock.Mock()
        request.headers = {"FRONTEND_API_KEY": "wrong-key"}

        with pytest.raises(drf_exceptions.PermissionDenied):
            helpers.check_request_source(request=request)

    def test_raises_if_frontend_key_is_missing(self):
        request = mock.Mock()
        request.headers = {}

        with pytest.raises(drf_exceptions.PermissionDenied):
            helpers.check_request_source(request=request)
