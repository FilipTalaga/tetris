import React, { Component } from 'react';
import makeGame from '../gameClasses/game';
import { squareSize, gapSize, marginSize, getCanvasSize } from '../utils/canvas-calcs';
import TitleBar from './title-bar';
import Score from './score';
import Background from './background';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { score: 0, level: 0 };

        this.gameCanvas = { width: getCanvasSize(10), height: getCanvasSize(20), ref: React.createRef() };
        this.nextCanvas = { width: getCanvasSize(4), height: getCanvasSize(4), ref: React.createRef() };
    }

    componentDidMount() {
        this.game = makeGame(this.gameCanvas, this.nextCanvas, this.onScoreUpdate, this.onGameOver);
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
                <div id="canvas" style={{ display: 'flex', margin: '0 auto', padding: marginSize }}>

                    <canvas style={{ background: 'rgba(0, 0, 0, 0.50)' }}
                        width={this.gameCanvas.width}
                        height={this.gameCanvas.height}
                        ref={this.gameCanvas.ref} />

                    <div style={{ marginLeft: marginSize, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: (squareSize * 2 + gapSize * 2), display: 'flex', background: 'rgba(0, 0, 0, 0.7' }}>
                            <h2 style={{ margin: 'auto' }}>NEXT</h2>
                        </div>

                        <canvas style={{ background: 'rgba(0, 0, 0, 0.50)' }}
                            width={this.nextCanvas.width}
                            height={this.nextCanvas.height}
                            ref={this.nextCanvas.ref} />

                        <div style={{ flex: 1 }}>{/*spacer*/}</div>
                        <div style={{ height: (squareSize * 2 + gapSize * 2), display: 'flex', background: 'rgba(0, 0, 0, 0.7' }}>
                            <h2 style={{ margin: 'auto' }}>LEVEL</h2>
                        </div>
                        <div style={{ height: squareSize * 4 + gapSize * 4, background: 'rgba(0, 0, 0, 0.5', display: 'flex' }}>
                            <h1 style={{ margin: 'auto', fontSize: '3rem' }}>{this.state.level}</h1>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
