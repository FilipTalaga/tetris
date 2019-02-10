import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PureCanvas from './pure-canvas';

class Canvas extends Component {
    componentDidUpdate() {
        const { angle } = this.props;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate((angle * Math.PI) / 180);
        this.ctx.fillStyle = '#733C82';
        this.ctx.fillRect(-this.width / 4, -this.height / 4, this.width / 2, this.height / 2);
        this.ctx.restore();
    }

    render() {
        return <PureCanvas contextRef={ctx => {
            this.ctx = ctx;
            this.width = this.ctx.canvas.width;
            this.height = this.ctx.canvas.height;
        }} />;
    }
}

Canvas.propTypes = {
    angle: PropTypes.number
};

export default Canvas;
