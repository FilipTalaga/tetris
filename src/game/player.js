import makeShape from './shape';

const moves = { left: 0, right: 1, down: 2, rotate: 3 };

function makePlayer(grid, updateScore) {
    let shape = makeShape(grid);

    function tryMove(moveName) {
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
            removeCompleteLines();
            shape = makeShape(grid);
        }
    }

    function removeCompleteLines() {
        let localScore = 0;
        for (let row = 0; row < grid.rows(); row++) {
            if (grid.isRowComplete(row)) {
                grid.removeRow(row);
                localScore += 80;
            }
        }
        if (localScore > 0) {
            updateScore(localScore);
        }
    }

    return {
        moveDown: () => tryMove(moves.down),
        moveLeft: () => tryMove(moves.left),
        moveRight: () => tryMove(moves.right),
        rotate: () => tryMove(moves.rotate)
    };
}

export default makePlayer;
