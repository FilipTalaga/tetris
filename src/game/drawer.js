const makeDrawer = (ctx, ctxState, grid) => {
    const { width, height, gap, size } = ctxState;

    return {
        clearCtx: () => ctx.clearRect(0, 0, width, height),
        colorCtx: (color) => ctx.fillStyle = color,
        drawBackground: () => ctx.fillRect(0, 0, width, height),
        drawRect: (row, col) => ctx.fillRect(gap + col * (size + gap),
            gap + row * (size + gap), size, size),
        drawNet: () => {
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
