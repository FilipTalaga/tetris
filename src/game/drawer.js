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

export default makeDrawer;
