const CV_BLOCK_ADD = 'CV_BLOCK_ADD';
const CV_BLOCK_DELETE = 'CV_BLOCK_DELETE';
const CV_BLOCK_MOVE = 'CV_BLOCK_MOVE';
const CV_BLOCK_RESIZE = 'CV_BLOCK_RESIZE';
const CV_BLOCK_ACTIVATE = 'CV_BLOCK_ACTIVATE';
const CV_ELEMENT_ACTIVATE = 'CV_ELEMENT_ACTIVATE';
const CV_ELEMENT_UPDATE = 'CV_ELEMENT_UPDATE';
const CV_TEXT_UPDATE = 'CV_TEXT_UPDATE';
const CV_BLOCK_SEND_BACK = 'CV_BLOCK_SEND_BACK';

const cvBlock_add = function(block) {
    return {
        type: CV_BLOCK_ADD,
        block:block,
    };
}

const cvBlock_delete = function(blockId) {
    return {
        type: CV_BLOCK_DELETE,
        blockId:blockId,
    };
}

const cvBlock_move = function(blockId,shiftTop,shiftLeft) {
    return {
        type: CV_BLOCK_MOVE,
        blockId:blockId,
        shiftTop: shiftTop,
        shiftLeft: shiftLeft,
    };
}

const cvBlock_resize = function(blockId,shiftHeight,shiftWidth) {
    return {
        type: CV_BLOCK_RESIZE,
        blockId:blockId,
        shiftHeight: shiftHeight,
        shiftWidth: shiftWidth,
    };
}

const cvBlock_activate = function(blockId) {
    return {
        type: CV_BLOCK_ACTIVATE,
        blockId:blockId,
    };
}

const cvElement_activate = function(style,elementId) {
    return {
        type: CV_ELEMENT_ACTIVATE,
        elementId:elementId,
        style:style,
    };
}

const cvElement_update = function(elementId,styleName,styleValue) {
    return {
        type: CV_ELEMENT_UPDATE,
        elementId: elementId,
        styleName: styleName,
        styleValue: styleValue,
    };
}

const cvElement_textUpdate = function(elementId,textValue) {
    return {
        type: CV_TEXT_UPDATE,
        elementId: elementId,
        textValue: textValue,
    };
}

const cvBlock_sendBack = function(blockId) {
    return {
        type: CV_BLOCK_SEND_BACK,
        blockId: blockId,
    };
}

export {
    cvBlock_add, CV_BLOCK_ADD,
    cvBlock_delete, CV_BLOCK_DELETE,
    cvBlock_move, CV_BLOCK_MOVE,
    cvBlock_resize, CV_BLOCK_RESIZE,
    cvBlock_activate, CV_BLOCK_ACTIVATE,
    cvBlock_sendBack, CV_BLOCK_SEND_BACK,
    cvElement_activate, CV_ELEMENT_ACTIVATE,
    cvElement_update, CV_ELEMENT_UPDATE,
    cvElement_textUpdate, CV_TEXT_UPDATE,
}
