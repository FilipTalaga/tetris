import makePlayer from './player';
import makeGrid from './grid';
import makeDrawer from './drawer';
import Hammer from 'hammerjs';

const makeGame = (gameCanvas, shapeCanvas, onScoreUpdate, onGameOver) => {
    let lastTimestampDown = 0;
    let lastTimestampSide = 0;
    let lastTimestampRotate = 0;

    let speedup = false;
    let left = false;
    let right = false;
    let up = false;

    let panLeft = 0;
    let panRight = 0;
    let panDown = 0;

    let gameGrid = makeGrid(20, 10);
    let gameDrawer = makeDrawer(gameCanvas.ctx, gameCanvas.ctxState, gameGrid);
    let shapeGrid = makeGrid(4, 4);
    let shapeDrawer = makeDrawer(shapeCanvas.ctx, shapeCanvas.ctxState, shapeGrid);
    let player = makePlayer(gameGrid, onScoreUpdate, onGameOver, onNextShapeUpdate);

    let rAF = null;

    function onNextShapeUpdate(shape) {
        shapeDrawer.clearCtx();
        shapeDrawer.drawNet();
        shape.shape.forEach((square, index) => {
            if (square) {
                const x = index % 4;
                const y = Math.floor(index / 4);
                shapeDrawer.drawRect(y, x, shape.color);
            }
        });
    }

    function onPanLeft() {
        panLeft++;
        if (panLeft >= 5) {
            player.moveLeft();
            panLeft = 0;
        }
    }

    function onPanRight() {
        panRight++;
        if (panRight >= 5) {
            player.moveRight();
            panRight = 0;
        }
    }

    function onPanDown() {
        panDown++;
        if (panDown >= 3) {
            player.moveDown();
            panDown = 0;
        }
    }

    function onTap() {
        player.rotate();
    }

    function handleKeyUp(e) {
        if (e.key === 'ArrowDown') speedup = false;
        if (e.key === 'ArrowLeft') left = false;
        if (e.key === 'ArrowRight') right = false;
        if (e.key === 'ArrowUp') up = false;
    }

    function handleKeyDown(e) {
        if (e.key === 'ArrowDown') speedup = true;
        if (e.key === 'ArrowLeft') left = true;
        if (e.key === 'ArrowRight') right = true;
        if (e.key === 'ArrowUp') up = true;
    }

    function loop(timestamp) {
        if (timestamp - lastTimestampDown >= (speedup ? 50 : 400)) {
            player.moveDown();
            lastTimestampDown = timestamp;
        }

        if (right && timestamp - lastTimestampSide >= 100) {
            player.moveRight();
            lastTimestampSide = timestamp;
        }

        if (left && timestamp - lastTimestampSide >= 100) {
            player.moveLeft();
            lastTimestampSide = timestamp;
        }

        if (up && timestamp - lastTimestampRotate >= 200) {
            player.rotate();
            lastTimestampRotate = timestamp;
        }

        draw();
        rAF = requestAnimationFrame(loop);
    }

    function draw() {
        gameDrawer.clearCtx();
        gameDrawer.drawNet();
        gameGrid.elements().forEach((square, index) => {
            if (square) {
                const row = Math.floor(index / gameGrid.cols());
                const col = index % gameGrid.cols();
                gameDrawer.drawRect(row, col, square - 1);
            }
        });
    }

    return {
        init() {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);

            const hammertime = new Hammer(document.getElementById('canvas'));
            hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
            hammertime.on('panleft', onPanLeft);
            hammertime.on('panright', onPanRight);
            hammertime.on('pandown', onPanDown);
            hammertime.on('tap', onTap);

            rAF = requestAnimationFrame(loop);
        },
        dispose() {
            cancelAnimationFrame(rAF);

            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        },
        resetGame: () => {
            speedup = false;
            left = false;
            right = false;
            up = false;

            gameGrid = makeGrid(20, 10);
            gameDrawer = makeDrawer(gameCanvas.ctx, gameCanvas.ctxState, gameGrid);
            shapeGrid = makeGrid(4, 4);
            shapeDrawer = makeDrawer(shapeCanvas.ctx, shapeCanvas.ctxState, shapeGrid);
            player = makePlayer(gameGrid, onScoreUpdate, onGameOver, onNextShapeUpdate);
        }
    };
};

export default makeGame;
