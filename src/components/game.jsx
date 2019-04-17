import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    canvas: {
        background: 'rgba(0, 0, 0, 0.50)'
    }
};

const Game = ({ width, height, canvasRef }) =>
    <canvas id="canvas" style={styles.canvas} width={width} height={height} ref={canvasRef} />;

Game.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    canvasRef: PropTypes.object
};

export default Game;
