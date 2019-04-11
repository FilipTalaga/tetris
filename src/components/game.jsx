import React, { Component } from 'react';
import makeGame from '../gameClasses/game';
import PureCanvas from './pureCanvas';
import { getSquareSize, getGapSize, getCanvasMargin } from '../utils';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = { score: 0 };

        this.isGameCanvasReady = false;
        this.isShapeCanvasReady = false;
    }

    onGameContextUpdate = (ctx, ctxState) => {
        this.gameCanvas = { ctx: ctx, ctxState: ctxState };
        this.isGameCanvasReady = true;

        this.tryInitGame();
    }

    onShapeContextUpdate = (ctx, ctxState) => {
        this.shapeCanvas = { ctx: ctx, ctxState: ctxState };
        this.isShapeCanvasReady = true;

        this.tryInitGame();
    }

    tryInitGame() {
        if (!this.isGameCanvasReady || !this.isShapeCanvasReady) return;

        const onScoreUpdate = this.handleScoreUpdate.bind(this);
        const onGameOver = this.handleGameOver.bind(this);

        this.game = makeGame(this.gameCanvas, this.shapeCanvas, onScoreUpdate, onGameOver);
        this.game.init();

    }

    handleScoreUpdate(value) {
        this.setState({ score: this.state.score + value });
    }

    handleGameOver() {
        alert('GAME OVER');
        this.game.resetGame();
        this.setState({ score: 0 });
    }

    componentWillUnmount() {
        this.game.dispose();
    }

    render() {
        const canvasMargin = getCanvasMargin();
        const size = getSquareSize();
        const gap = getGapSize();

        return (
            <React.Fragment>
                <div style={{ height: 50, display: 'flex', background: 'rgba(0, 0, 0, 0.8)' }}>
                    <h2 style={{ margin: 'auto 15px auto' }}>TETRIS</h2>
                </div>
                <div style={{ flex: 1, display: 'flex' }}>
                    <h1 style={{ margin: 'auto', letterSpacing: '.3rem' }}>
                        SCORE: {this.state.score}
                    </h1>
                </div>
                <div id="canvas" style={{ display: 'flex', margin: '0 auto', padding: canvasMargin }}>
                    <PureCanvas cols={10} rows={20} contextRef={this.onGameContextUpdate} />
                    <div style={{ marginLeft: canvasMargin }}>
                        <div style={{ height: (size * 2 + gap * 2), display: 'flex', background: 'rgba(0, 0, 0, 0.8' }}>
                            <h2 style={{ margin: 'auto' }}>NEXT</h2>
                        </div>
                        <PureCanvas cols={4} rows={4} contextRef={this.onShapeContextUpdate} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Game;
