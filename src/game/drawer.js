import colors from '../consts/colors';

const makeDrawer = (ctx, ctxState, grid) => {
    const { width, height, gap, size } = ctxState;
    const brickColors = {
        hues: [0, 30, 50, 100, 180, 230, 300],
        saturation: 70,
        lightness: 50
    };

    return {
        clearCtx: () => ctx.clearRect(0, 0, width, height),
        colorCtx: (color) => ctx.fillStyle = color,
        drawBackground: () => ctx.fillRect(0, 0, width, height),
        drawRect: (row, col, color) => {
            const x = gap + col * (size + gap);
            const y = gap + row * (size + gap);
            const { hues, saturation, lightness } = brickColors;

            // dark
            ctx.beginPath();
            ctx.rect(x, y, size, size);
            ctx.fillStyle = `hsl(${hues[color]}, ${saturation}%, ${lightness - 10}%)`;
            ctx.fill();

            // light
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size, y + size);
            ctx.fillStyle = `hsl(${hues[color]}, ${saturation}%, ${lightness + 10}%)`;
            ctx.fill();

            // standard
            ctx.beginPath();
            ctx.rect(x + gap, y + gap, size - gap * 2, size - gap * 2);
            ctx.fillStyle = `hsl(${hues[color]}, ${saturation}%, ${lightness}%)`;
            ctx.fill();
        },
        drawNet: () => {
            ctx.fillStyle = colors.net;
            for (let row = 0; row <= grid.rows(); row++) {
                ctx.fillRect(0, row * (size + gap), width, gap);
            }
            for (let col = 0; col <= grid.cols(); col++) {
                ctx.fillRect(col * (size + gap), 0, gap, height);
            }
        }

    };
};

export default makeDrawer;
