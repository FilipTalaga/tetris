/**
 * Computed values, dependent on defined constants
 */
const horizontalColumnsCount = 14;
const verticalColumnsCount = 20;
const horizontalGapsCount = 16;
const verticalGapsCount = 21;
const horizontalMarginsCount = 3;
const upperAreaHeight = window.innerHeight * 0.25;
const defaultMarginSize = window.innerWidth < 600 ? 10 : 20;
export const gapSize = window.innerWidth < 600 ? 2 : 3;

/**
 * Computed values, dependent on defined constants
 */
const canvasAreaHeight = window.innerHeight - upperAreaHeight;
const size = Math.floor((window.innerWidth - horizontalGapsCount * gapSize - horizontalMarginsCount * defaultMarginSize) / horizontalColumnsCount);
const allowedHeight = defaultMarginSize + size * verticalColumnsCount + gapSize * verticalGapsCount;

export const squareSize = allowedHeight > canvasAreaHeight
    ? Math.floor((canvasAreaHeight - defaultMarginSize - verticalGapsCount * gapSize) / 20)
    : size;

export const marginSize = allowedHeight > canvasAreaHeight
    ? defaultMarginSize
    : (window.innerWidth - size * horizontalColumnsCount - horizontalGapsCount * gapSize) / 3;


export const getCanvasDimension = elements => elements * squareSize + (elements + 1) * gapSize;
