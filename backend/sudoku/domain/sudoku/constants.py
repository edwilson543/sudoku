# Local application imports
from data import constants

NUMBER_OF_CLUES_FOR_SIZE = {
    constants.SudokuSize.FOUR: {
        constants.SudokuDifficulty.EASY: 13,
        constants.SudokuDifficulty.MEDIUM: 10,
        constants.SudokuDifficulty.HARD: 7,
    },
    constants.SudokuSize.NINE: {
        constants.SudokuDifficulty.EASY: 55,
        constants.SudokuDifficulty.MEDIUM: 45,
        constants.SudokuDifficulty.HARD: 35,
    },
}

GENERATION_TIMEOUT_SECONDS = 3
