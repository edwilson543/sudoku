# Django imports
from django.contrib import admin

# Local application imports
from data import models


@admin.register(models.Move)
class MoveAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "game",
        "number_in_game",
        "row",
        "column",
        "value",
        "is_undone",
    ]
    ordering = ["-number_in_game"]
    list_filter = ["game"]


@admin.register(models.Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ["id", "status", "player", "move_count"]
    ordering = ["id"]

    @admin.display(description="Number of moves")
    def move_count(self, game: models.Game) -> int:
        return game.moves.count()


@admin.register(models.Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ["id", "ip_address", "game_count"]
    ordering = ["id"]

    @admin.display(description="Game count")
    def game_count(self, player: models.Player) -> int:
        return player.games.count()


@admin.register(models.Sudoku)
class SudokuAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "game_count",
        "size",
        "difficulty",
        "number_of_missing_values",
    ]
    ordering = ["id"]
    list_filter = ["size", "difficulty"]

    @admin.display(description="Game count")
    def game_count(self, sudoku: models.Sudoku) -> int:
        return sudoku.games.count()
