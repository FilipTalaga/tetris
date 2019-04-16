import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    container: {
        flex: 1, display: 'flex', background: 'rgba(0, 0, 0, 0.7)'
    },
    text: {
        margin: 'auto', letterSpacing: '.3rem'
    }
};

const Score = ({ value }) =>
    <div style={styles.container}>
        <h1 style={styles.text}>
            SCORE: {value}
        </h1>
    </div>;

Score.propTypes = {
    value: PropTypes.number
};

export default Score;
