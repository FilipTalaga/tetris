import makePlayer from './player';
import makeGrid from './grid';
import makeDrawer from './drawer';
import Hammer from 'hammerjs';
import { getTimeByLevel } from '../utils/game-calcs';

const makeGame = (gameCanvas, shapeCanvas, gameAreaRef, onGameUpdate, onGameOver) => {
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
    let gameDrawer = makeDrawer(gameCanvas);
    let shapeGrid = makeGrid(4, 4);
    let shapeDrawer = makeDrawer(shapeCanvas);
    let player = makePlayer(gameGrid, shapeGrid, onPlayerUpdate, onGameOver);

    let rAF = null;

    let score = 0;
    let lines = 0;
    let level = 0;

    function onPlayerUpdate(removedLines) {
        score += getScoreByLines(removedLines);
        lines += removedLines;
        level = Math.floor(lines / 10);

        onGameUpdate(score, lines, level);
    }

    function getScoreByLines(removedLines) {
        if (removedLines === 1) return 40;
        if (removedLines === 2) return 100;
        if (removedLines === 3) return 300;
        if (removedLines === 4) return 1200;
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
        if (timestamp - lastTimestampDown >= (speedup ? 50 : getTimeByLevel(level))) {
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

        updateGraphics();
        rAF = requestAnimationFrame(loop);
    }

    function updateGraphics() {
        gameDrawer.clearCtx();
        gameDrawer.drawNet();
        gameGrid.elements().forEach((square, index) => {
            if (square) {
                const row = Math.floor(index / gameGrid.cols());
                const col = index % gameGrid.cols();
                gameDrawer.drawRect(row, col, square - 1);
            }
        });
        shapeDrawer.clearCtx();
        shapeDrawer.drawNet();
        shapeGrid.elements().forEach((square, index) => {
            if (square) {
                const row = Math.floor(index / shapeGrid.cols());
                const col = index % shapeGrid.cols();
                shapeDrawer.drawRect(row, col, square - 1);
            }
        });
    }

    return {
        init() {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);

            const hammertime = new Hammer(gameAreaRef.current);
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

            score = 0;
            lines = 0;
            level = 0;

            gameGrid = makeGrid(20, 10);
            gameDrawer = makeDrawer(gameCanvas);
            shapeGrid = makeGrid(4, 4);
            shapeDrawer = makeDrawer(shapeCanvas);
            player = makePlayer(gameGrid, shapeGrid, onPlayerUpdate, onGameOver);
        }
    };
};

export default makeGame;
