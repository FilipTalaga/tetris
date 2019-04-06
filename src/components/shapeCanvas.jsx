import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShapeCanvas extends Component {
    constructor(props) {
        super(props);
        const height = window.innerHeight - 160;
        const size = Math.floor(height / 22.1);
        const gap = Math.floor(height / 221);

        this.state = {
            size: size,
            gap: gap,
            width: 4 * size + 5 * gap,
            height: 4 * size + 5 * gap,
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

ShapeCanvas.propTypes = {
    contextRef: PropTypes.func
};

export default ShapeCanvas;
