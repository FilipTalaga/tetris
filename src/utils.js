/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns size of grid square (piece of shape),
 * that is calculated based on window height
 * 38 = (11 <game canvas gaps> + 5 <next canvas gaps> + 3 <spacer gaps>) * 2 <gap size>
 * 14 = 10 <game canvas columns> + 4 <next canvas columns>
 */
export const getSquareSize = () => {
    const xCols = 14;
    const yCols = 20;
    const xGaps = 16;
    const yGaps = 21;
    const xMargins = 3;
    const marginSize = getMarginSize();
    const gapSize = getGapSize();
    const upperAreaHeight = window.innerHeight * 0.25;
    const canvasAreaHeight = window.innerHeight - upperAreaHeight;

    const size = Math.floor((window.innerWidth - xGaps * gapSize - xMargins * marginSize) / xCols);
    const allowedHeight = marginSize + size * yCols + gapSize * yGaps;

    return allowedHeight > canvasAreaHeight
        ? Math.floor((canvasAreaHeight - marginSize - yGaps * gapSize) / 20)
        : size;
};

export const getCanvasMargin = () => {
    const xCols = 14;
    const yCols = 20;
    const xGaps = 16;
    const yGaps = 21;
    const xMargins = 3;
    const marginSize = getMarginSize();
    const gapSize = getGapSize();
    const upperAreaHeight = window.innerHeight * 0.25;
    const canvasAreaHeight = window.innerHeight - upperAreaHeight;

    const size = Math.floor((window.innerWidth - xGaps * gapSize - xMargins * marginSize) / xCols);
    const allowedHeight = marginSize + size * yCols + gapSize * yGaps;
    return allowedHeight > canvasAreaHeight
        ? marginSize
        : (window.innerWidth - size * xCols - xGaps * gapSize) / 3;
};

/**
 * Returns size of gap (distance between grid squares),
 * that is calculated based on window height
 */
export const getGapSize = () => window.innerWidth < 600 ? 2 : 3;

/**
 * Returns size of gap (distance between grid squares),
 * that is calculated based on window height
 */
export const getMarginSize = () => window.innerWidth < 600 ? 10 : 20;
