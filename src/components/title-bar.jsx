import React, { Component } from 'react';
import IconButton from './icon-button';
import { FaVolumeOff, FaVolumeUp } from 'react-icons/fa';

const makeAudio = (src, volume, loop = true) => {
    const sound = new Audio();
    sound.src = src;
    sound.loop = loop;
    sound.volume = volume;

    return {
        start: () => sound.play(),
        stop: () => {
            sound.pause();
            sound.currentTime = 0;
        }
    };
};

const styles = {
    titleBar: {
        height: 60,
        display: 'flex',
        background: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'space-between'
    },
    title: {
        margin: 'auto 15px auto'
    },
    icon: {
        margin: 'auto 15px auto'
    }
};

class TitleBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMusicPlayed: false
        };

        this.title = 'TETRIS';
        this.sound = makeAudio('tetris.mp3', 0.5);
    }

    onSoundButtonClick = () => {
        const { isMusicPlayed } = this.state;

        isMusicPlayed
            ? this.sound.stop()
            : this.sound.start();

        this.setState({
            isMusicPlayed: !isMusicPlayed
        });
    }

    render() {
        return (
            <div style={styles.titleBar}>
                <h2 style={styles.title}>{this.title}</h2>
                {this.state.isMusicPlayed
                    ? <IconButton style={styles.icon} onClick={this.onSoundButtonClick}><FaVolumeUp /></IconButton>
                    : <IconButton style={styles.icon} onClick={this.onSoundButtonClick}><FaVolumeOff /></IconButton>
                }
            </div>);
    }
}

export default TitleBar;
