import React, { Component } from 'react';
import Canvas from './canvas';

class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = { tick: 0 };
    }

    componentDidMount() {
        this.intervalId = setInterval(this.onTick, 20);
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    onTick = () => {
        this.setState(prevState => ({ tick: prevState.tick + 1 }));
    }

    updateAnimationState = () => {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
        cancelAnimationFrame(this.rAF);
    }

    render() {
        return <Canvas />;
    }
}

export default Animation;
