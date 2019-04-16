import React, { Component } from 'react';
import makeGame from '../gameClasses/game';
import PureCanvas from './pure-canvas';
import { getSquareSize, getGapSize, getCanvasMargin } from '../utils';
import TitleBar from './title-bar';
import Score from './score';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = { score: 0, level: 0 };

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
                <TitleBar></TitleBar>
                <Score value={this.state.score}></Score>
                <div id="canvas" style={{ display: 'flex', margin: '0 auto', padding: canvasMargin }}>
                    <PureCanvas cols={10} rows={20} contextRef={this.onGameContextUpdate} />
                    <div style={{ marginLeft: canvasMargin, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: (size * 2 + gap * 2), display: 'flex', background: 'rgba(0, 0, 0, 0.7' }}>
                            <h2 style={{ margin: 'auto' }}>NEXT</h2>
                        </div>
                        <PureCanvas cols={4} rows={4} contextRef={this.onShapeContextUpdate} />
                        <div style={{ flex: 1 }}>{/*spacer*/}</div>
                        <div style={{ height: (size * 2 + gap * 2), display: 'flex', background: 'rgba(0, 0, 0, 0.7' }}>
                            <h2 style={{ margin: 'auto' }}>LEVEL</h2>
                        </div>
                        <div style={{ height: size * 4 + gap * 4, background: 'rgba(0, 0, 0, 0.5', display: 'flex' }}>
                            <h1 style={{ margin: 'auto', fontSize: '3rem' }}>{this.state.level}</h1>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Game;
