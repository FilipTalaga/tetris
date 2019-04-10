import shapes from '../consts/shapes';
import { getRandomInt } from '../utils';

const moves = { left: 0, right: 1, down: 2, rotate: 3 };

let futureShape = getRandomInt(0, shapes.length - 1);
let currentShape = futureShape;

function generateNewShape() {
    currentShape = futureShape;
    futureShape = getRandomInt(0, shapes.length - 1);
    if (futureShape === currentShape) {
        futureShape = getRandomInt(0, shapes.length - 1);
    }
    return { current: currentShape, next: futureShape };
}

function setShapeValueOnGrid(grid, shape, color, posX, posY, value) {
    shape.forEach((square, index) => {
        if (square) {
            const x = index % 4 + posX;
            const y = Math.floor(index / 4) + posY;
            grid.set(y, x, value ? color : 0);
        }
    });
}

function makePlayer(gameGrid, shapeGrid, updateScore, onGameOver) {
    let generatedShapes = generateNewShape();

    let color = generatedShapes.current + 1;
    let shape = shapes[generatedShapes.current];

    let nextcolor = generatedShapes.next + 1;
    let nextShape = shapes[generatedShapes.next];
    setShapeValueOnGrid(shapeGrid, nextShape[0], nextcolor, 0, 0, true);

    let posX = 3;
    let posY = -2;
    let phase = 0;

    function moveLeft() { posX--; }
    function moveRight() { posX++; }
    function moveUp() { posY--; }
    function moveDown() { posY++; }
    function rotateRight() { phase = (phase + 1) % shape.length; }
    function rotateLeft() { phase = (phase - 1 < 0 ? shape.length - 1 : phase - 1) % shape.length; }

    function checkCollision() {
        return shape[phase].some((value, index) => {
            if (value) {
                const x = index % 4 + posX;
                const y = Math.floor(index / 4) + posY;
                const isEdge = x < 0 || x >= gameGrid.cols() || y >= gameGrid.rows();
                const isBrick = gameGrid.get(y, x);
                return isEdge || isBrick;
            }
        });
    }

    function spawnNewShape() {
        generatedShapes = generateNewShape();
        color = generatedShapes.current + 1;
        shape = shapes[generatedShapes.current];

        setShapeValueOnGrid(shapeGrid, nextShape[0], nextcolor, 0, 0, false);
        nextcolor = generatedShapes.next + 1;
        nextShape = shapes[generatedShapes.next];
        setShapeValueOnGrid(shapeGrid, nextShape[0], nextcolor, 0, 0, true);

        posX = 3;
        posY = -2;
        phase = 0;

        if (checkCollision()) onGameOver();
    }

    function removeCompleteLines() {
        let removedRows = 0;
        for (let row = 0; row < gameGrid.rows(); row++) {
            if (gameGrid.isRowComplete(row)) {
                gameGrid.removeRow(row);
                removedRows++;
            }
        }

        if (removedRows === 1) updateScore(40);
        if (removedRows === 2) updateScore(100);
        if (removedRows === 3) updateScore(300);
        if (removedRows === 4) updateScore(1200);
    }

    function tryMove(moveName) {
        setShapeValueOnGrid(gameGrid, shape[phase], color, posX, posY, false);

        if (moveName === moves.left) moveLeft();
        if (moveName === moves.right) moveRight();
        if (moveName === moves.down) moveDown();
        if (moveName === moves.rotate) rotateRight();

        const foundCollision = checkCollision();
        if (foundCollision) {
            if (moveName === moves.left) moveRight();
            if (moveName === moves.right) moveLeft();
            if (moveName === moves.down) moveUp();
            if (moveName === moves.rotate) rotateLeft();
        }

        setShapeValueOnGrid(gameGrid, shape[phase], color, posX, posY, true);

        if (moveName == moves.down && foundCollision) {
            removeCompleteLines();
            spawnNewShape();
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
