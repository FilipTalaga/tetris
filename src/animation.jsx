import React, { Component } from 'react';
import Canvas from './canvas';

class Animation extends Component {
    child = React.createRef();
    lastRender = 0;

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        this.rAF = requestAnimationFrame(this.loop);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        cancelAnimationFrame(this.rAF);
    }

    handleKeyDown = e => {
        this.child.current.moveSide(e.key);
    }

    loop = timestamp => {
        const progress = timestamp - this.lastRender;
        // update every 200 ms
        if (progress >= 200) {
            this.lastRender = timestamp;
            this.child.current.move();
        }
        this.child.current.draw();
        this.rAF = requestAnimationFrame(this.loop);
    }

    render = () => <Canvas ref={this.child} />;
}

export default Animation;
