import React from 'react';
import PropTypes from 'prop-types';
import { squareSize, gapSize } from '../utils/canvas-calcs';

const styles = {
    label: {
        height: (squareSize * 2 + gapSize * 2),
        display: 'flex',
        background: 'rgba(0, 0, 0, 0.7'
    },
    text: {
        margin: 'auto'
    },
    canvas: {
        background: 'rgba(0, 0, 0, 0.50)'
    }
};

const Next = ({ width, height, canvasRef }) =>
    <div>
        <div style={styles.label}>
            <h2 style={styles.text}>NEXT</h2>
        </div>
        <canvas style={styles.canvas} width={width} height={height} ref={canvasRef} />
    </div>;

Next.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    canvasRef: PropTypes.object
};

export default Next;
