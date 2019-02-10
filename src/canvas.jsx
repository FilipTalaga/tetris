import React, { Component } from 'react';
import PureCanvas from './pure-canvas';
import colors from './colors';

class Canvas extends Component {
    player = { level: 0, column: 4 };
    grid = Array(16).fill(null).map(() => Array(9).fill(false));
    running = true;

    componentDidMount() {
        this.spawn();
    }

    componentDidUpdate() {
        if (!this.running) return;

        this.move();
        this.drawGrid();
    }

    onContextUpdate = ctx => {
        this.ctx = ctx;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
    }

    spawn() {
        this.player.level = 0;
        this.player.column = Math.floor(Math.random() * 10);
        if (this.grid[this.player.level][this.player.column]) {
            this.running = false;
            alert('game over');
        } else {
            this.grid[this.player.level][this.player.column] = true;
        }
    }

    move() {
        this.player.level++;
        if (this.player.level >= 16 || this.grid[this.player.level][this.player.column]) {
            this.spawn();
        } else {
            this.grid[this.player.level - 1][this.player.column] = false;
            this.grid[this.player.level][this.player.column] = true;
        }
    }

    drawGrid() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = colors.primary;
        for (let level = 0; level < 16; level++) {
            for (let column = 0; column < 9; column++) {
                if (this.grid[level][column]) {
                    this.drawRect(level, column);
                }
            }
        }
    }

    drawRect(level, column) {
        const size = this.width / 9;
        this.ctx.fillRect(column * size, level * size, size, size);
    }

    render() {
        return <PureCanvas contextRef={this.onContextUpdate} onClick={this.onContextClick} />;
    }
}

export default Canvas;
