import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PureCanvas extends Component {
    constructor(props) {
        super(props);
        const height = window.innerHeight - 100;
        const size = Math.floor(height / 22.1);
        const gap = Math.floor(height / 221);

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
                onClick={this.props.onClick}
            />
        );
    }
}

PureCanvas.propTypes = {
    onClick: PropTypes.func,
    contextRef: PropTypes.func
};

export default PureCanvas;
