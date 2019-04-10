import shapes from '../consts/shapes';

const makeShape = seed => ({
    phase: 0,
    color: seed + 1,
    length: shapes[seed].length,
    elements: function () {
        return shapes[seed][this.phase];
    }
});

export default makeShape;
