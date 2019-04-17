const levels = 20;
const zeroLevelFrames = 48;
const framesPerSecond = 60;
const singleFrameTime = 1000 / framesPerSecond;
const framesPerLevelDrop = zeroLevelFrames / levels;

export const getTimeByLevel = level => level < levels
    ? Math.round((zeroLevelFrames - level * framesPerLevelDrop) * singleFrameTime)
    : Math.round((zeroLevelFrames - (levels - 1) * framesPerLevelDrop) * singleFrameTime);
