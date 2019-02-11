import React, { Component } from 'react';
import PureCanvas from './pure-canvas';
import colors from './colors';

const rows = 20;
const columns = 10;

class Canvas extends Component {
    player = { level: 0, column: 4 };
    grid = Array(rows * columns).fill(0);
    running = true;

    componentDidMount() {
        this.spawnPlayer();
    }

    spawnPlayer() {
        this.player.level = 0;
        this.player.column = Math.floor(Math.random() * columns);
        if (this.grid[this.player.level * columns + this.player.column]) {
            this.running = false;
            alert('game over');
        } else {
            this.grid[this.player.level * columns + this.player.column] = 1;
        }
    }

    move() {
        if (!this.running) return;

        this.moveDown();
    }

    moveSide(key) {
        if (!this.running) return;

        if (key === 'ArrowRight') {
            this.moveRight();
        }

        if (key === 'ArrowLeft') {
            this.moveLeft();
        }

        if (key === 'ArrowDown') {
            this.moveDown();
        }
    }

    moveLeft = () => {
        if (this.player.column % columns > 0 &&
            !this.grid[this.player.level * columns + this.player.column - 1]) {
            this.grid[this.player.level * columns + this.player.column] = 0;
            this.player.column--;
            this.grid[this.player.level * columns + this.player.column] = 1;
        }
    }

    moveRight = () => {
        if (this.player.column % columns < (columns - 1) &&
            !this.grid[this.player.level * columns + this.player.column + 1]) {
            this.grid[this.player.level * columns + this.player.column] = 0;
            this.player.column++;
            this.grid[this.player.level * columns + this.player.column] = 1;
        }
    }

    moveDown = () => {
        if (this.player.level < (rows - 1) &&
            !this.grid[(this.player.level + 1) * columns + this.player.column]) {
            this.grid[this.player.level * columns + this.player.column] = 0;
            this.player.level++;
            this.grid[this.player.level * columns + this.player.column] = 1;
        } else {
            this.spawnPlayer();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = colors.primary;
        this.grid.forEach((square, index) => {
            if (square) {
                this.fillRect(Math.floor(index / columns), index % columns);
            }
        });

    }

    fillRect(level, column) {
        const size = this.width / columns;
        this.ctx.fillRect(column * size, level * size, size, size);
    }

    onContextUpdate = ctx => {
        this.ctx = ctx;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
    }

    render() {
        const button = {
            border: 'none',
            outline: 'none',
            width: '80px',
            height: '40px',
            background: colors.yellow,
            color: '#dadada',
            fontWeight: 'bold',
            fontSize: '30px'
        };

        return (
            <React.Fragment>
                <PureCanvas contextRef={this.onContextUpdate} onClick={this.onContextClick} />
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
                    <button onClick={this.moveLeft} style={button}>{'<'}</button>
                    <button onClick={this.moveDown} style={button}>v</button>
                    <button onClick={this.moveRight} style={button}>{'>'}</button>
                </div>
            </React.Fragment>
        );
    }
}

export default Canvas;
