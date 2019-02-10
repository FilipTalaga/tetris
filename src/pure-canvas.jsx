import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PureCanvas extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <canvas
                width="300"
                height="300"
                style={{ margin: 'auto' }}
                ref={node => node ? this.props.contextRef(node.getContext('2d')) : null}
            />
        );
    }
}

PureCanvas.propTypes = {
    contextRef: PropTypes.func
};

export default PureCanvas;
