import { brickColors } from '../colors';
import Shape from './shape';

const shape = new Shape();
console.log(shape.color);
console.log(shape.values);
shape.rotate();
console.log(shape.values);
shape.rotate();
console.log(shape.values);
shape.rotate();
console.log(shape.values);
shape.rotate();
console.log(shape.values);
shape.rotate();
console.log(shape.values);
shape.rotate();
console.log(shape.values);

function generateShape() {
    const shapes = [[
        { row: -1, col: 3 },
        { row: -1, col: 4 },
        { row: -1, col: 5 },
        { row: 0, col: 5 }
    ], [
        { row: -1, col: 4 },
        { row: -1, col: 5 },
        { row: 0, col: 4 },
        { row: 0, col: 5 }
    ], [
        { row: -2, col: 5 },
        { row: -1, col: 4 },
        { row: -1, col: 5 },
        { row: 0, col: 4 }
    ], [
        { row: -3, col: 4 },
        { row: -2, col: 4 },
        { row: -1, col: 4 },
        { row: 0, col: 4 }
    ], [
        { row: -2, col: 4 },
        { row: -1, col: 4 },
        { row: -1, col: 5 },
        { row: 0, col: 4 }
    ]];

    return {
        color: Math.floor(Math.random() * brickColors.length) + 1,
        cords: shapes[Math.floor(Math.random() * shapes.length)],
        phase: 0
    };
}

const makePlayer = grid => (shape => ({
    moveDown: () => {
        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, 0);
            }
        });
        shape.posY++;
        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, 1);
            }
        });
    },
    moveLeft: () => {
        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, 0);
            }
        });
        shape.posX--;
        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, 1);
            }
        });

    },
    moveRight: () => {
        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, 0);
            }
        });
        shape.posX++;
        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, 1);
            }
        });

    },
    rotate: () => {
        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, 0);
            }
        });
        shape.rotate();
        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, 1);
            }
        });
    }
}))(new Shape());

/*const makePlayer = grid => (shape => ({
    moveDown: () => {
        shape.cords.forEach(x => grid.set(x.row, x.col, 0));
        const hasBrickCollision = shape.cords.some(x => grid.get(x.row + 1, x.col));
        const hasEdgeCollision = shape.cords.some(x => x.row + 1 >= grid.rows());
        if (hasBrickCollision || hasEdgeCollision) {
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
            shape = generateShape();
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
        } else {
            shape.cords.forEach(x => grid.set(++x.row, x.col, shape.color));
        }
    },
    moveLeft: () => {
        shape.cords.forEach(x => grid.set(x.row, x.col, 0));
        const hasBrickCollision = shape.cords.some(x => grid.get(x.row, x.col - 1));
        const hasEdgeCollision = shape.cords.some(x => x.col - 1 < 0);
        if (hasBrickCollision || hasEdgeCollision) {
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
        } else {
            shape.cords.forEach(x => grid.set(x.row, --x.col, shape.color));
        }
    },
    moveRight: () => {
        shape.cords.forEach(x => grid.set(x.row, x.col, 0));
        const isCollision = shape.cords.some(x => grid.get(x.row, x.col + 1));
        const isWall = shape.cords.some(x => x.col + 1 >= grid.cols());
        if (isCollision || isWall) {
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
        } else {
            shape.cords.forEach(x => grid.set(x.row, ++x.col, shape.color));
        }
    },
    rotate: () => {

    }
}))(generateShape());*/

export default makePlayer;
