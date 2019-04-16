import React from 'react';
import Game from './game';

const App = () => (
    <React.Fragment>
        <div className="shape-container">
            <div id="standard"></div>
        </div>
        <div className="shape-container">
            <div id="light"></div>
        </div>
        <Game />
    </React.Fragment>
);

export default App;
