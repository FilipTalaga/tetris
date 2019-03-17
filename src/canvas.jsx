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

const makeDrawer = (ctx, ctxState, grid) => ({
    clearCtx: () => ctx.clearRect(0, 0, ctxState.width, ctxState.height),
    colorCtx: (color) => ctx.fillStyle = color,
    drawBackground: () => ctx.fillRect(0, 0, ctxState.width, ctxState.height),
    drawRect: (row, col) => ctx.fillRect(ctxState.gap + col * (ctxState.size + ctxState.gap),
        ctxState.gap + row * (ctxState.size + ctxState.gap), ctxState.size, ctxState.size),
    drawNet: () => {
        for (let row = 0; row <= grid.rows(); row++) {
            ctx.fillRect(0, row * (ctxState.size + ctxState.gap), ctxState.width, ctxState.gap);
        }
        for (let col = 0; col <= grid.cols(); col++) {
            ctx.fillRect(col * (ctxState.size + ctxState.gap), 0, ctxState.gap, ctxState.height);
        }
    }
});

const makePlayer = (grid, shape) => ({
    moveDown: () => {
        shape.forEach(x => grid.set(x.row, x.col, 0));
        const isCollision = shape.some(x => grid.get(x.row + 1, x.col));
        const isEnd = shape.some(x => x.row + 1 >= grid.rows());
        if (isCollision || isEnd) {
            shape.forEach(x => grid.set(x.row, x.col, 1));
            shape = generateShape();
        } else {
            shape.forEach(x => grid.set(++x.row, x.col, 1));
        }
    },
    moveLeft: () => {
        shape.forEach(x => grid.set(x.row, x.col, 0));
        const isCollision = shape.some(x => grid.get(x.row, x.col - 1));
        const isEnd = shape.some(x => x.col - 1 < 0);
        if (isCollision || isEnd) {
            shape.forEach(x => grid.set(x.row, x.col, 1));
        } else {
            shape.forEach(x => grid.set(x.row, --x.col, 1));
        }
    },
    moveRight: () => {
        shape.forEach(x => grid.set(x.row, x.col, 0));
        const isCollision = shape.some(x => grid.get(x.row, x.col + 1));
        const isEnd = shape.some(x => x.col + 1 >= grid.cols());
        if (isCollision || isEnd) {
            shape.forEach(x => grid.set(x.row, x.col, 1));
        } else {
            shape.forEach(x => grid.set(x.row, ++x.col, 1));
        }
    }
});

const generateShape = () => {
    const shapes = [
        [
            { row: 0, col: 3 },
            { row: 0, col: 4 },
            { row: 0, col: 5 },
            { row: 1, col: 5 }
        ], [
            { row: 0, col: 4 },
            { row: 0, col: 5 },
            { row: 1, col: 4 },
            { row: 1, col: 5 }
        ]
    ];

    return shapes[Math.floor(Math.random() * 2)];
};

class Canvas extends Component {
    onContextUpdate = (ctx, ctxState) => {
        this.ctx = ctx;
        this.grid = makeGrid(20, 10);
        this.drawer = makeDrawer(this.ctx, ctxState, this.grid);
        this.player = makePlayer(this.grid, generateShape());
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
        this.drawer.colorCtx(colors.background);
        this.drawer.drawBackground();
        this.drawer.colorCtx(colors.net);
        this.drawer.drawNet(this.grid.cols(), this.grid.rows());
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
                <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBottom: '20px' }}>
                    <button onClick={() => this.player.moveLeft()} style={button}>{'<'}</button>
                    <button onClick={() => this.player.moveDown()} style={button}>{'v'}</button>
                    <button onClick={() => this.player.moveRight()} style={button}>{'>'}</button>
                </div>
            </React.Fragment>
        );
    }
}

export default Canvas;
