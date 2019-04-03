import shapes from '../consts/shapes';
import { getRandomInt } from '../utils';

const makeShape = grid => {
    const randomShape = getRandomInt(0, shapes.length - 1);
    const color = randomShape + 1;
    const shape = shapes[randomShape];

    let posX = 3;
    let posY = -2;
    let phase = 0;

    return {
        moveLeft: () => posX--,
        moveRight: () => posX++,
        moveUp: () => posY--,
        moveDown: () => posY++,
        rotateRight: () => phase = (phase + 1) % shape.length,
        rotateLeft: () => phase = (phase - 1 < 0 ? shape.length - 1 : phase - 1) % shape.length,
        checkCollision: () => shape[phase].some((value, index) => {
            if (value) {
                const x = index % 4 + posX;
                const y = Math.floor(index / 4) + posY;
                const isEdge = x < 0 || x >= grid.cols() || y >= grid.rows();
                const isBrick = grid.get(y, x);
                return isEdge || isBrick;
            }
        }),
        setShapeValueOnGrid: value => {
            shape[phase].forEach((square, index) => {
                if (square) {
                    const x = index % 4 + posX;
                    const y = Math.floor(index / 4) + posY;
                    grid.set(y, x, value ? color : 0);
                }
            });
        }
    };
};

export default makeShape;
