import { brickColors } from '../colors';

const generateShape = () => {
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
        cords: shapes[Math.floor(Math.random() * shapes.length)]
    };
};

const makePlayer = (grid, shape = generateShape()) => ({
    moveDown: () => {
        shape.cords.forEach(x => grid.set(x.row, x.col, 0));
        const isCollision = shape.cords.some(x => grid.get(x.row + 1, x.col));
        const isEnd = shape.cords.some(x => x.row + 1 >= grid.rows());
        if (isCollision || isEnd) {
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
            shape = generateShape();
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
        } else {
            shape.cords.forEach(x => grid.set(++x.row, x.col, shape.color));
        }
    },
    moveLeft: () => {
        shape.cords.forEach(x => grid.set(x.row, x.col, 0));
        const isCollision = shape.cords.some(x => grid.get(x.row, x.col - 1));
        const isEnd = shape.cords.some(x => x.col - 1 < 0);
        if (isCollision || isEnd) {
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
        } else {
            shape.cords.forEach(x => grid.set(x.row, --x.col, shape.color));
        }
    },
    moveRight: () => {
        shape.cords.forEach(x => grid.set(x.row, x.col, 0));
        const isCollision = shape.cords.some(x => grid.get(x.row, x.col + 1));
        const isEnd = shape.cords.some(x => x.col + 1 >= grid.cols());
        if (isCollision || isEnd) {
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
        } else {
            shape.cords.forEach(x => grid.set(x.row, ++x.col, shape.color));
        }
    },
    shuttle: () => {

    }
});

export default makePlayer;
