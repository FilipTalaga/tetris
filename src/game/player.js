import Shape from './shape';

const makePlayer = grid => (shape => ({
    moveDown: () => {
        shape.setShapeValueOnGrid(grid, 0);
        shape.posY++;
        const foundCollision = shape.checkCollision(grid);
        if (foundCollision) {
            shape.posY--;
        }
        shape.setShapeValueOnGrid(grid, shape.color);
        if (foundCollision) {
            shape = new Shape();
        }
    },
    moveLeft: () => {
        shape.setShapeValueOnGrid(grid, 0);
        shape.posX--;
        if (shape.checkCollision(grid)) {
            shape.posX++;
        }
        shape.setShapeValueOnGrid(grid, shape.color);
    },
    moveRight: () => {
        shape.setShapeValueOnGrid(grid, 0);
        shape.posX++;
        if (shape.checkCollision(grid)) {
            shape.posX--;
        }
        shape.setShapeValueOnGrid(grid, shape.color);
    },
    rotate: () => {
        shape.setShapeValueOnGrid(grid, 0);
        shape.rotateRight();
        if (shape.checkCollision(grid)) {
            shape.rotateLeft();
        }
        shape.setShapeValueOnGrid(grid, shape.color);
    }
}))(new Shape());

export default makePlayer;
