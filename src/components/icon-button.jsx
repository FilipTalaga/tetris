import React from 'react';
import PropTypes from 'prop-types';
import stylePropTypes from 'react-style-proptype';

const styles = {
    container: {
        display: 'grid',
        width: '36px',
        height: '36px'
    },
    cell: {
        gridColumn: 1,
        gridRow: 1,
        display: 'flex',
    },
    icon: {
        margin: 'auto',
        color: 'black',
        fontSize: 20
    },
    button: {
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        borderRadius: '100%',
        display: 'flex',
        cursor: 'pointer',
        background: '#fff',
        color: '#000',
    }
};

const IconButton = props =>
    <div style={{ ...styles.container, ...props.style }}>
        <div style={styles.cell}>
            <button style={styles.button} onClick={props.onClick}></button>
        </div>
        <div style={{ ...styles.cell, pointerEvents: 'none' }}>
            {React.cloneElement(props.children, { style: styles.icon })}
        </div>
    </div >;

IconButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    style: stylePropTypes
};

export default IconButton;
