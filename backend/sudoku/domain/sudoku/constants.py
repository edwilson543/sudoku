# Local application imports
from data import constants

NUMBER_OF_CLUES_FOR_SIZE = {
    4: {
        constants.SudokuDifficulty.EASY: 13,
        constants.SudokuDifficulty.MEDIUM: 10,
        constants.SudokuDifficulty.HARD: 7,
    },
    9: {
        constants.SudokuDifficulty.EASY: 55,
        constants.SudokuDifficulty.MEDIUM: 45,
        constants.SudokuDifficulty.HARD: 35,
    },
}

GENERATION_TIMEOUT_SECONDS = 3
