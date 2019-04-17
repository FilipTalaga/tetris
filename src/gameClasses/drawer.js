import colors from '../consts/colors';
import { squareSize, gapSize } from '../utils/canvas-calcs';

const makeDrawer = ({ width, height, ref }) => {
    const brickColors = {
        hues: [0, 30, 50, 100, 180, 230, 300],
        saturation: 70,
        lightness: 50
    };

    const ctx = ref.current.getContext('2d');

    return {
        clearCtx: () => ctx.clearRect(0, 0, width, height),
        colorCtx: (color) => ctx.fillStyle = color,
        drawBackground: () => ctx.fillRect(0, 0, width, height),
        drawRect: (row, col, color) => {
            const x = gapSize + col * (squareSize + gapSize);
            const y = gapSize + row * (squareSize + gapSize);
            const { hues, saturation, lightness } = brickColors;

            // dark
            ctx.beginPath();
            ctx.rect(x, y, squareSize, squareSize);
            ctx.fillStyle = `hsl(${hues[color]}, ${saturation}%, ${lightness - 10}%)`;
            ctx.fill();

            // light
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + squareSize, y);
            ctx.lineTo(x + squareSize, y + squareSize);
            ctx.fillStyle = `hsl(${hues[color]}, ${saturation}%, ${lightness + 10}%)`;
            ctx.fill();

            // standard
            ctx.beginPath();
            ctx.rect(x + gapSize * 2, y + gapSize * 2, squareSize - gapSize * 4, squareSize - gapSize * 4);
            ctx.fillStyle = `hsl(${hues[color]}, ${saturation}%, ${lightness}%)`;
            ctx.fill();
        },
        drawNet: () => {
            ctx.fillStyle = colors.net;
            for (let row = 0; row <= height; row += squareSize + gapSize) {
                ctx.fillRect(0, row, width, gapSize);
            }
            for (let col = 0; col <= width; col += squareSize + gapSize) {
                ctx.fillRect(col, 0, gapSize, height);
            }
        }

    };
};

export default makeDrawer;
