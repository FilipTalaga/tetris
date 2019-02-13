import React, { Component } from 'react';
import PureCanvas from './pure-canvas';
import colors from './colors';

const makeGrid = (rows, cols) => (grid => ({
    elements: () => grid,
    rows: () => rows,
    cols: () => cols,
    get: (row, col) => grid[row * cols + col],
    set: (row, col, value) => grid[row * cols + col] = value
}))(Array(rows * cols).fill(0));

const makeDrawer = (ctx, width, height, grid) => ({
    clearCtx: () => ctx.clearRect(0, 0, width, height),
    colorCtx: (color) => ctx.fillStyle = color,
    drawRect: (row, col) => {
        const size = width / grid.cols();
        ctx.fillRect(col * size, row * size, size, size);
    }
});

const makePlayer = grid => ((row, col) => ({
    moveDown: () => {
        if (grid.get(row + 1, col) || row + 1 >= grid.rows()) {
            row = 0;
            col = Math.floor(Math.random() * grid.cols());
        } else {
            grid.set(row++, col, 0);
        }
        grid.set(row, col, 1);
    },
    moveLeft: () => {
        if (grid.get(row, col - 1) || col - 1 < 0) return;

        grid.set(row, col--, 0);
        grid.set(row, col, 1);
    },
    moveRight: () => {
        if (grid.get(row, col + 1) || col + 1 >= grid.cols()) return;

        grid.set(row, col++, 0);
        grid.set(row, col, 1);
    }
}))(grid.rows() - 1, 0);

class Canvas extends Component {
    onContextUpdate = ctx => {
        this.ctx = ctx;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.grid = makeGrid(20, 10);
        this.drawer = makeDrawer(this.ctx, this.width, this.height, this.grid);
        this.player = makePlayer(this.grid);
    }

    move(key) {
        switch (key) {
            case 'ArrowDown':
                this.player.moveDown();
                break;

            case 'ArrowLeft':
                this.player.moveLeft();
                break;

            case 'ArrowRight':
                this.player.moveRight();
                break;
        }
    }

    draw() {
        this.drawer.clearCtx();
        this.drawer.colorCtx(colors.primary);
        this.grid.elements().forEach((square, index) => {
            if (square) {
                const row = Math.floor(index / this.grid.cols());
                const col = index % this.grid.cols();
                this.drawer.drawRect(row, col);
            }
        });

    }

    render() {
        const button = {
            border: 'none',
            outline: 'none',
            width: '60px',
            height: '60px',
            borderRadius: '14px',
            background: colors.yellow,
            color: colors.background,
            fontWeight: 900,
            fontSize: '30px'
        };

        return (
            <React.Fragment>
                <PureCanvas contextRef={this.onContextUpdate} onClick={this.onContextClick} />
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
                    <button onClick={() => this.player.moveLeft()} style={button}>{'<'}</button>
                    <button onClick={() => this.player.moveDown()} style={button}>{'v'}</button>
                    <button onClick={() => this.player.moveRight()} style={button}>{'>'}</button>
                </div>
            </React.Fragment>
        );
    }
}

export default Canvas;
