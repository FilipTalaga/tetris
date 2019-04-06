import React, { Component } from 'react';
import GameCanvas from './gameCanvas';
import makePlayer from '../game/player';
import makeGrid from '../game/grid';
import makeDrawer from '../game/drawer';
import Hammer from 'hammerjs';
import ShapeCanvas from './shapeCanvas';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { score: 0 };
    }

    onGameContextUpdate = (ctx, ctxState) => {
        this.gameCtx = ctx;
        this.gameCtxState = ctxState;
        this.resetGame();
    }

    onShapeContextUpdate = (ctx, ctxState) => {
        this.shapeCtx = ctx;
        this.shapeCtxState = ctxState;
        this.shapeGrid = makeGrid(4, 4);
        this.shapeDrawer = makeDrawer(this.shapeCtx, this.shapeCtxState, this.shapeGrid);
    }

    resetGame() {
        this.lastTimestampDown = 0;
        this.lastTimestampSide = 0;
        this.lastTimestampRotate = 0;

        this.speedup = false;
        this.left = false;
        this.right = false;
        this.up = false;

        this.panLeft = 0;
        this.panRight = 0;
        this.panDown = 0;

        this.setState({ score: 0 });

        this.gameGrid = makeGrid(20, 10);
        this.gameDrawer = makeDrawer(this.gameCtx, this.gameCtxState, this.gameGrid);
        this.player = makePlayer(this.gameGrid, this.scoreOnUpdate.bind(this), this.onGameOver.bind(this), this.onNextShapeUpdate.bind(this));
    }

    scoreOnUpdate(value) {
        this.setState({ score: this.state.score + value });
    }

    onGameOver() {
        alert('GAME OVER');
        this.resetGame();
    }

    onNextShapeUpdate(shape) {
        this.shapeDrawer.clearCtx();
        this.shapeDrawer.drawNet();
        shape.shape.forEach((square, index) => {
            if (square) {
                const x = index % 4;
                const y = Math.floor(index / 4);
                this.shapeDrawer.drawRect(y, x, shape.color);
            }
        });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.rAF = requestAnimationFrame(this.loop.bind(this));
        this.hammertime = new Hammer(document.getElementById('canvas'));
        this.hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        this.hammertime.on('panleft', this.onPanLeft.bind(this));
        this.hammertime.on('panright', this.onPanRight.bind(this));
        this.hammertime.on('pandown', this.onPanDown.bind(this));
        this.hammertime.on('tap', this.onTap.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        cancelAnimationFrame(this.rAF);
    }

    onPanLeft() {
        this.panLeft++;
        if (this.panLeft >= 5) {
            this.player.moveLeft();
            this.panLeft = 0;
        }
    }

    onPanRight() {
        this.panRight++;
        if (this.panRight >= 5) {
            this.player.moveRight();
            this.panRight = 0;
        }
    }

    onPanDown() {
        this.panDown++;
        if (this.panDown >= 3) {
            this.player.moveDown();
            this.panDown = 0;
        }

    }

    onTap() {
        this.player.rotate();
    }

    handleKeyUp(e) {
        if (e.key === 'ArrowDown') this.speedup = false;
        if (e.key === 'ArrowLeft') this.left = false;
        if (e.key === 'ArrowRight') this.right = false;
        if (e.key === 'ArrowUp') this.up = false;
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowDown') this.speedup = true;
        if (e.key === 'ArrowLeft') this.left = true;
        if (e.key === 'ArrowRight') this.right = true;
        if (e.key === 'ArrowUp') this.up = true;
    }

    loop(timestamp) {
        if (timestamp - this.lastTimestampDown >= (this.speedup ? 50 : 400)) {
            this.player.moveDown();
            this.lastTimestampDown = timestamp;
        }

        if (this.right && timestamp - this.lastTimestampSide >= 100) {
            this.player.moveRight();
            this.lastTimestampSide = timestamp;
        }

        if (this.left && timestamp - this.lastTimestampSide >= 100) {
            this.player.moveLeft();
            this.lastTimestampSide = timestamp;
        }

        if (this.up && timestamp - this.lastTimestampRotate >= 200) {
            this.player.rotate();
            this.lastTimestampRotate = timestamp;
        }

        this.draw();
        this.rAF = requestAnimationFrame(this.loop.bind(this));
    }

    draw() {
        this.gameDrawer.clearCtx();
        this.gameDrawer.drawNet();
        this.gameGrid.elements().forEach((square, index) => {
            if (square) {
                const row = Math.floor(index / this.gameGrid.cols());
                const col = index % this.gameGrid.cols();
                this.gameDrawer.drawRect(row, col, square - 1);
            }
        });
    }

    render = () =>
        <React.Fragment>
            <h2 style={{ margin: 'auto auto 0' }}>
                SCORE: {this.state.score}
            </h2>
            <div id="canvas" style={{ display: 'flex', margin: 'auto 0', justifyContent: 'space-evenly' }}>
                <div>
                    <GameCanvas contextRef={this.onGameContextUpdate} />
                </div>
                <div>
                    <ShapeCanvas contextRef={this.onShapeContextUpdate} />
                </div>
            </div>
        </React.Fragment>;
}

export default Game;
