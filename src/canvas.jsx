import React, { Component } from 'react';
import PureCanvas from './pure-canvas';
import colors, { brickColors } from './colors';
import { FaCaretLeft, FaUndoAlt, FaCaretDown, FaCaretRight } from 'react-icons/fa';

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
        shape.cords.forEach(x => grid.set(x.row, x.col, 0));
        const isCollision = shape.cords.some(x => grid.get(x.row + 1, x.col));
        const isEnd = shape.cords.some(x => x.row + 1 >= grid.rows());
        if (isCollision || isEnd) {
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
            shape = generateShape();
        } else {
            shape.cords.forEach(x => grid.set(++x.row, x.col, shape.color));
        }
    },
    moveLeft: () => {
        shape.cords.forEach(x => grid.set(x.row, x.col, 0));
        const isCollision = shape.cords.some(x => grid.get(x.row, x.col - 1));
        const isEnd = shape.cords.some(x => x.col - 1 < 0);
        if (isCollision || isEnd) {
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
        } else {
            shape.cords.forEach(x => grid.set(x.row, --x.col, shape.color));
        }
    },
    moveRight: () => {
        shape.cords.forEach(x => grid.set(x.row, x.col, 0));
        const isCollision = shape.cords.some(x => grid.get(x.row, x.col + 1));
        const isEnd = shape.cords.some(x => x.col + 1 >= grid.cols());
        if (isCollision || isEnd) {
            shape.cords.forEach(x => grid.set(x.row, x.col, shape.color));
        } else {
            shape.cords.forEach(x => grid.set(x.row, ++x.col, shape.color));
        }
    },
    shuttle: () => {

    }
});

const generateShape = () => {
    const shapes = [[
        { row: 0, col: 3 },
        { row: 0, col: 4 },
        { row: 0, col: 5 },
        { row: 1, col: 5 }
    ], [
        { row: 0, col: 4 },
        { row: 0, col: 5 },
        { row: 1, col: 4 },
        { row: 1, col: 5 }
    ], [
        { row: 0, col: 5 },
        { row: 1, col: 4 },
        { row: 1, col: 5 },
        { row: 2, col: 4 }
    ], [
        { row: 0, col: 4 },
        { row: 1, col: 4 },
        { row: 2, col: 4 },
        { row: 3, col: 4 }
    ], [
        { row: 0, col: 4 },
        { row: 1, col: 4 },
        { row: 1, col: 5 },
        { row: 2, col: 4 }
    ]];

    return {
        color: Math.floor(Math.random() * brickColors.length) + 1,
        cords: shapes[Math.floor(Math.random() * shapes.length)]
    };
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
        this.drawer.colorCtx(colors.pink);
        this.grid.elements().forEach((square, index) => {
            if (square) {
                this.drawer.colorCtx(brickColors[square - 1]);
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
            borderRadius: '6px',
            color: colors.background,
            fontSize: '40px',
            display: 'flex'
        };

        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    <PureCanvas contextRef={this.onContextUpdate} onClick={this.onContextClick} />
                    <div style={{ margin: '0 auto', padding: '20px' }}>
                        <p>Score</p>
                        <p>2341</p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: 'auto 0', padding: '20px 0' }}>
                    <button onClick={() => this.player.moveLeft()} style={button}>
                        <FaCaretLeft style={{ margin: 'auto' }} />
                    </button>
                    <button onClick={() => this.player.moveDown()} style={button}>
                        <FaCaretDown style={{ margin: 'auto' }} />
                    </button>
                    <button onClick={() => this.player.moveRight()} style={button}>
                        <FaCaretRight style={{ margin: 'auto' }} />
                    </button>
                    <button onClick={() => this.player.shuttle()} style={button}>
                        <FaUndoAlt style={{ margin: 'auto' }} />
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default Canvas;
