# Standard library imports
from typing import Any

# Third party imports
import pytest
from rest_framework import test as drf_test

# Django imports
from django.conf import settings


class APIClient(drf_test.APIClient):
    def _credentials(self, **kwargs: object) -> dict[str, Any]:
        credentials = super().credentials(**kwargs)
        credentials["FRONTEND_API_KEY"] = settings.FRONTEND_API_KEY
        return credentials


@pytest.fixture
def rest_api_client() -> APIClient:
    yield APIClient()


@pytest.fixture(autouse=True)
def auto_enable_db_access(db) -> None:
    yield
