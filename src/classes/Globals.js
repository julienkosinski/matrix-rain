import _ from 'lodash';

let font_size = 15;
const updateFontSize = size => font_size = size;

let p;
const setP5Instance = pInstance => p = pInstance;

const max_active_raindrops = 40;

let canvasWidth;
const setCanvasWidth = canvasWidthValue => canvasWidth = canvasWidthValue;
let canvasHeight;
const setCanvasHeight = canvasHeightValue => canvasHeight = canvasHeightValue;

export {
    p,
    _,
    font_size,
    updateFontSize,
    setP5Instance,
    max_active_raindrops,
    canvasWidth,
    canvasHeight,
    setCanvasWidth,
    setCanvasHeight
};
