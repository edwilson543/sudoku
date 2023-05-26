# Third party imports
import pytest
from rest_framework import test as drf_test

# Django imports
from django import test

TEST_FRONTEND_API_KEY = "key"


class APIRequest:
    pass


class APIClient(drf_test.APIClient):
    def post(self, *args: object, **extra: object):
        extra["HTTP_FRONTEND_API_KEY"] = TEST_FRONTEND_API_KEY
        return super().post(*args, **extra)


@pytest.fixture(autouse=True)
def set_frontend_api_key() -> None:
    with test.override_settings(FRONTEND_API_KEY=TEST_FRONTEND_API_KEY):
        yield


@pytest.fixture
def rest_api_client() -> APIClient:
    yield APIClient()


@pytest.fixture(autouse=True)
def auto_enable_db_access(db) -> None:
    yield
