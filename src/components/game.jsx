import React, { Component } from 'react';
import makeGame from '../gameClasses/game';
import { getSquareSize } from '../utils';
import PureCanvas from './pureCanvas';

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
        const sqrSize = getSquareSize();

        return (
            <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ margin: `0 auto ${sqrSize}px` }}>
                    SCORE: {this.state.score}
                </h2>
                <div id="canvas" style={{ display: 'flex', margin: '0 auto' }}>
                    <div>
                        <PureCanvas cols={10} rows={20} contextRef={this.onGameContextUpdate} />
                    </div>
                    <div style={{ marginLeft: `${sqrSize}px` }}>
                        <h2 style={{ textAlign: 'center', margin: 0 }}>NEXT</h2>
                        <PureCanvas cols={4} rows={4} contextRef={this.onShapeContextUpdate} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
