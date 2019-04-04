import React, { Component } from 'react';
import PureCanvas from './pure-canvas';
import makePlayer from '../game/player';
import makeGrid from '../game/grid';
import makeDrawer from '../game/drawer';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { score: 0 };
    }

    onContextUpdate = (ctx, ctxState) => {
        this.ctx = ctx;
        this.ctxState = ctxState;
        this.resetGame();
    }

    resetGame() {
        this.lastTimestampDown = 0;
        this.lastTimestampSide = 0;
        this.lastTimestampRotate = 0;

        this.speedup = false;
        this.left = false;
        this.right = false;
        this.up = false;

        this.setState({ score: 0 });

        this.grid = makeGrid(20, 10);
        this.drawer = makeDrawer(this.ctx, this.ctxState, this.grid);
        this.player = makePlayer(this.grid, this.scoreOnUpdate.bind(this), this.onGameOver.bind(this));
    }

    scoreOnUpdate(value) {
        this.setState({ score: this.state.score + value });
    }

    onGameOver() {
        alert('GAME OVER');
        this.resetGame();
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.rAF = requestAnimationFrame(this.loop.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        cancelAnimationFrame(this.rAF);
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
        this.drawer.clearCtx();
        this.drawer.drawNet();
        this.grid.elements().forEach((square, index) => {
            if (square) {
                const row = Math.floor(index / this.grid.cols());
                const col = index % this.grid.cols();
                this.drawer.drawRect(row, col, square - 1);
            }
        });
    }

    render = () =>
        <React.Fragment>
            <h2 style={{ margin: 'auto auto 0' }}>
                SCORE: {this.state.score}
            </h2>
            <div style={{ margin: 'auto' }}>
                <PureCanvas contextRef={this.onContextUpdate} onClick={this.onContextClick} />
            </div>
        </React.Fragment>;
}

export default Game;
