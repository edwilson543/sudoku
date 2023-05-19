# Django imports
from django.core import management


def test_django_system_checks_pass():
    management.call_command("check")
