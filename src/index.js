import { h, render } from 'preact';
import App from './app';
import * as serviceWorker from './serviceWorker';
import './style.css';

render(<App />, document.getElementById('root'));
module.hot.accept();
serviceWorker.register();
