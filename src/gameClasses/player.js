import { getRandomInt } from '../utils';
import makeShape from './shape';
import shapes from '../consts/shapes';

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

function setShapeValueOnGrid(grid, shape, value, posX = 0, posY = 0) {
    shape.elements().forEach((square, index) => {
        if (square) {
            const x = index % 4 + posX;
            const y = Math.floor(index / 4) + posY;
            grid.set(y, x, value ? shape.color : 0);
        }
    });
}

function makePlayer(gameGrid, shapeGrid, updateScore, onGameOver) {
    let generatedShapes = generateNewShape();

    let shape = makeShape(generatedShapes.current);
    let nextShape = makeShape(generatedShapes.next);
    setShapeValueOnGrid(shapeGrid, nextShape, true);

    let posX = 3;
    let posY = -2;

    function moveLeft() { posX--; }
    function moveRight() { posX++; }
    function moveUp() { posY--; }
    function moveDown() { posY++; }
    function rotateRight() { shape.phase = (shape.phase + 1) % shape.length; }
    function rotateLeft() { shape.phase = (shape.phase - 1 < 0 ? shape.length - 1 : shape.phase - 1) % shape.length; }

    function checkCollision() {
        return shape.elements().some((value, index) => {
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
        shape = makeShape(generatedShapes.current);

        setShapeValueOnGrid(shapeGrid, nextShape, false);
        nextShape = makeShape(generatedShapes.next);
        setShapeValueOnGrid(shapeGrid, nextShape, true);

        posX = 3;
        posY = -2;

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
        setShapeValueOnGrid(gameGrid, shape, false, posX, posY);

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

        setShapeValueOnGrid(gameGrid, shape, true, posX, posY);

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
