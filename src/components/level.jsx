import React from 'react';
import PropTypes from 'prop-types';
import { squareSize, gapSize } from '../utils/canvas-calcs';

const styles = {
    label: {
        background: {
            height: (squareSize * 2 + gapSize * 2),
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.7'
        },
        text: {
            margin: 'auto'
        }
    },
    level: {
        background: {
            height: squareSize * 4 + gapSize * 4,
            background: 'rgba(0, 0, 0, 0.5',
            display: 'flex'
        },
        text: {
            margin: 'auto',
            fontSize: '3rem'
        }
    }
};

const Level = ({ level }) =>
    <div>
        <div style={styles.label.background}>
            <h2 style={styles.label.text}>LEVEL</h2>
        </div>
        <div style={styles.level.background}>
            <h1 style={styles.level.text}>{level}</h1>
        </div>
    </div>;

Level.propTypes = {
    level: PropTypes.number
};

export default Level;
