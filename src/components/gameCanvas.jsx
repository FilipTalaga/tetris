import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSquareSize, getGapSize } from '../utils';

class GameCanvas extends Component {
    constructor(props) {
        super(props);
        const size = getSquareSize();
        const gap = getGapSize();

        this.state = {
            size: size,
            gap: gap,
            width: 10 * size + 11 * gap,
            height: 20 * size + 21 * gap,
        };
    }

    shouldComponentUpdate() {
        if (this.shouldUpdate) {
            this.shouldUpdate = false;
            return true;
        }
        return false;
    }

    render() {
        return (
            <canvas
                width={this.state.width}
                height={this.state.height}
                ref={node => node ? this.props.contextRef(node.getContext('2d'), this.state) : null}
            />
        );
    }
}

GameCanvas.propTypes = {
    contextRef: PropTypes.func
};

export default GameCanvas;
