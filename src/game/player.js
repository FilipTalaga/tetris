import makeShape from './shape';

const moves = { left: 0, right: 1, down: 2, rotate: 3 };

const makePlayer = grid => {
    let shape = makeShape(grid);

    const tryMove = moveName => {
        shape.setShapeValueOnGrid(false);

        if (moveName === moves.left) shape.moveLeft();
        if (moveName === moves.right) shape.moveRight();
        if (moveName === moves.down) shape.moveDown();
        if (moveName === moves.rotate) shape.rotateRight();

        const foundCollision = shape.checkCollision();
        if (foundCollision) {
            if (moveName === moves.left) shape.moveRight();
            if (moveName === moves.right) shape.moveLeft();
            if (moveName === moves.down) shape.moveUp();
            if (moveName === moves.rotate) shape.rotateLeft();
        }

        shape.setShapeValueOnGrid(true);

        if (moveName == moves.down && foundCollision) {
            shape = makeShape(grid);
        }
    };

    return {
        moveDown: () => tryMove(moves.down),
        moveLeft: () => tryMove(moves.left),
        moveRight: () => tryMove(moves.right),
        rotate: () => tryMove(moves.rotate)
    };
};

export default makePlayer;
