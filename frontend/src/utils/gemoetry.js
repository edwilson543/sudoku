export function getTileIndex(rowIndex, columnIndex, sudokuSize) {
    const sudokuRank = Math.sqrt(sudokuSize);
    return Math.floor(rowIndex / sudokuRank) * sudokuRank + Math.floor(columnIndex / sudokuRank)
}
