import React, { Component } from 'react';
import Canvas from './canvas';

class Animation extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.lastRender = 0;
        this.speedup = false;
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
        if (e.key === 'ArrowDown') {
            this.speedup = false;
        }
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowDown') {
            this.speedup = true;
        }
        this.child.current.move(e.key);
    }

    loop(timestamp) {
        if (timestamp - this.lastRender >= (this.speedup ? 50 : 400)) { // update every 400 ms
            this.updateLogic();
            this.lastRender = timestamp;
        }
        this.updateGraphics();
        this.rAF = requestAnimationFrame(this.loop.bind(this));
    }

    updateLogic() {
        this.child.current.moveDown();
    }

    updateGraphics() {
        this.child.current.draw();
    }

    render = () => <Canvas ref={this.child} />;
}

export default Animation;
