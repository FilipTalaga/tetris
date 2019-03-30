const makeGrid = (rows, cols) => {
    const grid = Array(rows * cols).fill(0);

    return {
        elements: () => grid,
        rows: () => rows,
        cols: () => cols,
        get: (row, col) => grid[row * cols + col],
        set: (row, col, value) => row >= 0 && col >= 0 ? grid[row * cols + col] = value : 0,
        isRowComplete: row => {
            let result = true;
            for (let col = 0; col < cols; col++) {
                result = result && grid[row * cols + col];
            }
            return result;
        }
    };
};

export default makeGrid;
