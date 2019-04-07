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
 * Returns maximum avialable canvas height,
 * that is calculated based on window height
 */
export const getCanvasMaxHeight = () => window.innerHeight - 190;

/**
 * Returns size of grid square (piece of shape),
 * that is calculated based on window height
 */
export const getSquareSize = () => Math.floor(getCanvasMaxHeight() / 22.1);

/**
 * Returns size of gap (distance between grid squares),
 * that is calculated based on window height
 */
export const getGapSize = () => Math.floor(getCanvasMaxHeight() / 221);
