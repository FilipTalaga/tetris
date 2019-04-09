import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import './style.css';

ReactDOM.render(<App />, document.getElementById('root'));
module.hot.accept();
serviceWorker.register();
//document.getElementById('tetrisAudio').play();
