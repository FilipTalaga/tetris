import React from 'react';

const stretched = {
    height: '100%',
    width: '100%'
};

const styles = {
    shape: {
        ...stretched,
        position: 'absolute',
        filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.2))',
        zIndex: '-1'
    },
    standard: {
        ...stretched,
        clipPath: 'polygon(51% 32%, 100% 15%, 100% 100%, 26% 100%)',
        background: '#40446B'
    },
    light: {
        ...stretched,
        clipPath: 'polygon(61% 0, 36% 29%, 83% 66%, 0 88%, 0 0)',
        background: '#555A8E'
    }
};

const Background = () => (
    <React.Fragment>
        <div style={styles.shape}>
            <div style={styles.standard}></div>
        </div>
        <div style={styles.shape}>
            <div style={styles.light}></div>
        </div>
    </React.Fragment>
);

export default Background;
