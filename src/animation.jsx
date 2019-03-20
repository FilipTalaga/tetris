import React, { Component } from 'react';
import Canvas from './canvas';

class Animation extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.lastRender = 0;
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.rAF = requestAnimationFrame(this.loop.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        cancelAnimationFrame(this.rAF);
    }

    handleKeyDown(e) {
        this.child.current.move(e.key);
    }

    loop(timestamp) {
        if (timestamp - this.lastRender >= 200) { // update every 200 ms
            this.updateLogic();
            this.lastRender = timestamp;
        }
        this.updateGraphics();
        this.rAF = requestAnimationFrame(this.loop.bind(this));
    }

    updateLogic() {
        this.child.current.move('ArrowDown');
    }

    updateGraphics() {
        this.child.current.draw();
    }

    render = () => <Canvas ref={this.child} />;
}

export default Animation;
