const makeGrid = (rows, cols) => (grid => ({
    elements: () => grid,
    rows: () => rows,
    cols: () => cols,
    get: (row, col) => grid[row * cols + col],
    set: (row, col, value) => row >= 0 && col >= 0 ? grid[row * cols + col] = value : 0
}))(Array(rows * cols).fill(0));

export default makeGrid;
