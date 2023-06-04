# Generated by Django 4.2.1 on 2023-05-19 20:55

# Django imports
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Game",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("ACTIVE", "Active"),
                            ("COMPLETE_NO_ERRORS", "Complete No Errors"),
                            ("COMPLETE_WITH_ERRORS", "Complete With Errors"),
                            ("INCOMPLETE_DISCARDED", "Incomplete Discarded"),
                        ],
                        max_length=64,
                    ),
                ),
                ("started_at", models.DateTimeField(auto_now_add=True)),
                ("ended_at", models.DateTimeField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Player",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ip_address", models.CharField(unique=True, max_length=128)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Sudoku",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("problem", models.JSONField()),
                ("solution", models.JSONField()),
                ("size", models.PositiveIntegerField()),
                (
                    "difficulty",
                    models.CharField(
                        choices=[
                            ("EASY", "Easy"),
                            ("MEDIUM", "Medium"),
                            ("HARD", "Hard"),
                        ],
                        max_length=64,
                    ),
                ),
                ("number_of_missing_values", models.PositiveIntegerField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Move",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("row", models.PositiveIntegerField()),
                ("column", models.PositiveIntegerField()),
                ("value", models.PositiveIntegerField(null=True)),
                ("is_undone", models.BooleanField(default=False)),
                ("made_at", models.DateTimeField(auto_now_add=True)),
                (
                    "game",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="moves",
                        to="data.game",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="game",
            name="player",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="games",
                to="data.player",
            ),
        ),
        migrations.AddField(
            model_name="game",
            name="sudoku",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="games",
                to="data.sudoku",
            ),
        ),
    ]
