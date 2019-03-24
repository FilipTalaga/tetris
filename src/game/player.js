import Shape from './shape';

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

        const cannotMove = shape.values.some((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                const isEdge = x < 0 || x >= grid.cols() || y >= grid.rows();
                const isBrick = grid.get(y, x);
                return isEdge || isBrick;
            }
        });

        if (cannotMove) {
            shape.posY--;
        }

        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, shape.color);
            }
        });

        if (cannotMove) {
            shape = new Shape();
        }
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

        const cannotMove = shape.values.some((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                const isEdge = x < 0 || x >= grid.cols() || y >= grid.rows();
                const isBrick = grid.get(y, x);
                return isEdge || isBrick;
            }
        });

        if (cannotMove) {
            shape.posX++;
        }

        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, shape.color);
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

        const cannotMove = shape.values.some((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                const isEdge = x < 0 || x >= grid.cols() || y >= grid.rows();
                const isBrick = grid.get(y, x);
                return isEdge || isBrick;
            }
        });

        if (cannotMove) {
            shape.posX--;
        }

        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, shape.color);
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

        shape.rotateLeft();

        const cannotMove = shape.values.some((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                const isEdge = x < 0 || x >= grid.cols() || y >= grid.rows();
                const isBrick = grid.get(y, x);
                return isEdge || isBrick;
            }
        });

        if (cannotMove) {
            shape.rotateRight();
        }

        shape.values.forEach((value, index) => {
            if (value) {
                const x = index % 4 + shape.posX;
                const y = Math.floor(index / 4) + shape.posY;
                grid.set(y, x, shape.color);
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
