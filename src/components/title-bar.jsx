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

class TitleBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMusicPlayed: false
        };

        this.sound = makeAudio('tetris.mp3', 0.5);
    }

    onSoundPlay = () => {
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
            <div style={{ height: 60, display: 'flex', background: 'rgba(0, 0, 0, 0.9)', justifyContent: 'space-between' }}>
                <h2 style={{ margin: 'auto 15px auto' }}>TETRIS</h2>
                {this.state.isMusicPlayed
                    ? <IconButton onClick={this.onSoundPlay}><FaVolumeUp></FaVolumeUp></IconButton>
                    : <IconButton onClick={this.onSoundPlay}><FaVolumeOff></FaVolumeOff></IconButton>
                }
            </div>);
    }
}

export default TitleBar;
