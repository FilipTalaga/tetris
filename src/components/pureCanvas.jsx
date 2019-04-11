import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSquareSize, getGapSize } from '../utils';

class PureCanvas extends Component {
    constructor(props) {
        super(props);
        const size = getSquareSize();
        const gap = getGapSize();

        this.state = {
            size: size,
            gap: gap,
            width: this.props.cols * size + (this.props.cols + 1) * gap,
            height: this.props.rows * size + (this.props.rows + 1) * gap,
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
            <canvas style={{ background: 'rgba(0, 0, 0, 0.50)' }}
                width={this.state.width}
                height={this.state.height}
                ref={node => node ? this.props.contextRef(node.getContext('2d'), this.state) : null}
            />
        );
    }
}

PureCanvas.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number,
    contextRef: PropTypes.func
};

export default PureCanvas;
