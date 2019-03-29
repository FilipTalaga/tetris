import shapes from './shapes';
import { brickColors } from '../colors';

const makeShape = grid => {
    const color = Math.floor(Math.random() * brickColors.length) + 1;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    let posX = 3;
    let posY = -4;
    let phase = 0;

    return {
        moveLeft: () => posX--,
        moveRight: () => posX++,
        moveUp: () => posY--,
        moveDown: () => posY++,
        rotateRight: () => phase = (phase + 1) % 4,
        rotateLeft: () => phase = (phase - 1 < 0 ? 3 : phase - 1) % 4,
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
