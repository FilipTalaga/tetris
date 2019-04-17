import React, { Component } from 'react';
import makeGame from '../gameClasses/game';
import { marginSize, getCanvasSize } from '../utils/canvas-calcs';
import TitleBar from './title-bar';
import Score from './score';
import Background from './background';
import Game from './game';
import Next from './next';
import Level from './level';

const styles = {
    gameSection: {
        display: 'flex',
        margin: '0 auto',
        padding: marginSize
    },
    sideArea: {
        marginLeft: marginSize,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
};

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
                <div style={styles.gameSection}>
                    <Game width={this.gameCanvas.width} height={this.gameCanvas.height} canvasRef={this.gameCanvas.ref} />
                    <div style={styles.sideArea}>
                        <Next width={this.nextCanvas.width} height={this.nextCanvas.height} canvasRef={this.nextCanvas.ref} />
                        <Level level={this.state.level} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
