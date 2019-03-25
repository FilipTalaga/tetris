import shapes from './shapes';
import { brickColors } from '../colors';

class Shape {
    constructor() {
        this.color = Math.floor(Math.random() * brickColors.length) + 1;
        this.posX = 3;
        this.posY = -4;

        this._shape = shapes[Math.floor(Math.random() * shapes.length)];
        this._phase = 0;
    }

    get values() {
        return this._shape[this._phase];
    }

    set values(value) {
        this._shape[this._phase] = value;
    }

    checkCollision(grid) {
        return this._shape[this._phase].some((value, index) => {
            if (value) {
                const x = index % 4 + this.posX;
                const y = Math.floor(index / 4) + this.posY;
                const isEdge = x < 0 || x >= grid.cols() || y >= grid.rows();
                const isBrick = grid.get(y, x);
                return isEdge || isBrick;
            }
        });
    }

    setShapeValueOnGrid(grid, value) {
        this._shape[this._phase].forEach((square, index) => {
            if (square) {
                const x = index % 4 + this.posX;
                const y = Math.floor(index / 4) + this.posY;
                grid.set(y, x, value);
            }
        });
    }

    rotateRight() {
        this._phase = (this._phase + 1) % 4;
    }

    rotateLeft() {
        this._phase = (this._phase - 1 < 0 ? 3 : this._phase - 1) % 4;
    }
}

export default Shape;
