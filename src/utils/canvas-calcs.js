const horizontalColumnsCount = 14;
const verticalColumnsCount = 20;
const horizontalGapsCount = 16;
const verticalGapsCount = 21;
const horizontalMarginsCount = 3;
const marginSize = window.innerWidth < 600 ? 10 : 20;
const gapSize = window.innerWidth < 600 ? 2 : 3;
const upperAreaHeight = window.innerHeight * 0.25;
const canvasAreaHeight = window.innerHeight - upperAreaHeight;
const size = Math.floor((window.innerWidth - horizontalGapsCount * gapSize - horizontalMarginsCount * marginSize) / horizontalColumnsCount);
const allowedHeight = marginSize + size * verticalColumnsCount + gapSize * verticalGapsCount;

export const getSquareSize = () => allowedHeight > canvasAreaHeight
    ? Math.floor((canvasAreaHeight - marginSize - verticalGapsCount * gapSize) / 20)
    : size;

export const getCanvasMargin = () => allowedHeight > canvasAreaHeight
    ? marginSize
    : (window.innerWidth - size * horizontalColumnsCount - horizontalGapsCount * gapSize) / 3;

export const getGapSize = () => gapSize;

export const getMarginSize = () => marginSize;
