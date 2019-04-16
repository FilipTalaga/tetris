import React, { Component } from 'react';
import makeGame from '../gameClasses/game';
import { getSquareSize, getGapSize, getCanvasMargin, getCanvasDimension } from '../utils/canvas-calcs';
import TitleBar from './title-bar';
import Score from './score';
import Background from './background';

const makeContextState = (columnCount, rowCount, gap, size) => ({
    width: getCanvasDimension(columnCount),
    height: getCanvasDimension(rowCount),
    gap: gap,
    size: size
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            level: 0
        };

        this.gap = getGapSize();
        this.size = getSquareSize();

        this.gameCanvas = React.createRef();
        this.nextCanvas = React.createRef();

        this.gameContext = makeContextState(10, 20, this.gap, this.size);
        this.nextContext = makeContextState(4, 4, this.gap, this.size);
    }

    componentDidMount() {
        this.game = makeGame(
            { ctx: this.gameCanvas.current.getContext('2d'), ctxState: this.gameContext },
            { ctx: this.nextCanvas.current.getContext('2d'), ctxState: this.nextContext },
            this.onScoreUpdate, this.onGameOver);
        this.game.init();
    }

    onScoreUpdate = value => this.setState({ score: this.state.score + value });

    onGameOver = () => {
        alert('GAME OVER');
        this.game.resetGame();
        this.setState({ score: 0 });
    }

    componentWillUnmount = () => this.game.dispose();

    render() {
        return (
            <React.Fragment>
                <Background />
                <TitleBar></TitleBar>
                <Score value={this.state.score}></Score>
                <div id="canvas" style={{ display: 'flex', margin: '0 auto', padding: getCanvasMargin() }}>

                    <canvas style={{ background: 'rgba(0, 0, 0, 0.50)' }}
                        width={this.gameContext.width}
                        height={this.gameContext.height}
                        ref={this.gameCanvas} />

                    <div style={{ marginLeft: getCanvasMargin(), display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: (this.size * 2 + this.gap * 2), display: 'flex', background: 'rgba(0, 0, 0, 0.7' }}>
                            <h2 style={{ margin: 'auto' }}>NEXT</h2>
                        </div>

                        <canvas style={{ background: 'rgba(0, 0, 0, 0.50)' }}
                            width={this.nextContext.width}
                            height={this.nextContext.height}
                            ref={this.nextCanvas} />

                        <div style={{ flex: 1 }}>{/*spacer*/}</div>
                        <div style={{ height: (this.size * 2 + this.gap * 2), display: 'flex', background: 'rgba(0, 0, 0, 0.7' }}>
                            <h2 style={{ margin: 'auto' }}>LEVEL</h2>
                        </div>
                        <div style={{ height: this.size * 4 + this.gap * 4, background: 'rgba(0, 0, 0, 0.5', display: 'flex' }}>
                            <h1 style={{ margin: 'auto', fontSize: '3rem' }}>{this.state.level}</h1>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
