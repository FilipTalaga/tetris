import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PureCanvas extends Component {
    constructor(props) {
        super(props);
        const height = window.innerHeight - 80;
        const size = Math.floor(height / 22.1);
        const gap = Math.floor(height / 221);

        this.state = {
            size: size,
            gap: gap,
            width: 10 * size + 11 * gap,
            height: 20 * size + 21 * gap,
        };
    }

    componentDidMount() {
        //this.updateDimensions();
        //window.addEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        const height = window.innerHeight;
        const width = window.innerWidth > 600 ? height / 16 * 9 : window.innerWidth;

        this.setState({ width: width, height: height });
        this.shouldUpdate = true;
    }

    shouldComponentUpdate() {
        if (this.shouldUpdate) {
            this.shouldUpdate = false;
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        //window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <canvas
                width={this.state.width}
                height={this.state.height}
                style={{ margin: 'auto auto 0 auto' }}
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
