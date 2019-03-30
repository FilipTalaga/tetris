const makeGrid = (rows, cols) => {
    let grid = Array(rows * cols).fill(0);

    return {
        elements: () => grid,
        rows: () => rows,
        cols: () => cols,
        get: (row, col) => grid[row * cols + col],
        set: (row, col, value) => row >= 0 && col >= 0 ? grid[row * cols + col] = value : 0,
        isRowComplete: row => grid.slice(row * cols, row * cols + cols).every(Boolean),
        removeRow: row => {
            grid.splice(row * cols, cols);
            grid = [...Array(cols).fill(0), ...grid];
        }
    };
};

export default makeGrid;
