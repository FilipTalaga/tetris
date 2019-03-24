import shapes from './shapes';
import { brickColors } from '../colors';

/*const makeShape = () => {
    let phase = 0;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    return {
        x: 0,
        y: 0,
        color: Math.floor(Math.random() * brickColors.length) + 1,
        shape: () => shape[phase],
        rotate: () => phase = (phase + 1) % 4
    };
};*/

class Shape {
    constructor() {
        this.color = Math.floor(Math.random() * brickColors.length) + 1;
        this.posX = 0;
        this.posY = 0;

        this._shape = shapes[Math.floor(Math.random() * shapes.length)];
        this._phase = 0;
    }

    get values() {
        return this._shape[this._phase];
    }

    set values(value) {
        this._shape[this._phase] = value;
    }

    rotate() {
        this._phase = (this._phase + 1) % 4;
    }
}

export default Shape;
