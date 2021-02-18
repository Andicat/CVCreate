const CV_BLOCK_ADD = 'CV_BLOCK_ADD';
const CV_BLOCK_DELETE = 'CV_BLOCK_DELETE';
const CV_BLOCK_MOVE = 'CV_BLOCK_MOVE';
const CV_BLOCK_RESIZE = 'CV_BLOCK_RESIZE';
const CV_BLOCK_ACTIVATE = 'CV_BLOCK_ACTIVATE';
const CV_BLOCK_ACTIVATE_MULTI = 'CV_BLOCK_ACTIVATE_MULTI';
const CV_BLOCK_COPY = 'CV_BLOCK_COPY';
const CV_BLOCK_SET_SIZE = 'CV_BLOCK_SET_SIZE';
const CV_ELEMENT_ACTIVATE = 'CV_ELEMENT_ACTIVATE';
const CV_ELEMENT_UPDATE = 'CV_ELEMENT_UPDATE';
const CV_TEXT_UPDATE = 'CV_TEXT_UPDATE';
const CV_BLOCK_SEND_BACK = 'CV_BLOCK_SEND_BACK';
const CV_BLOCK_ALIGN_TOP = 'CV_BLOCK_ALIGN_TOP';
const CV_BLOCK_ALIGN_LEFT = 'CV_BLOCK_ALIGN_LEFT';
const CV_BLOCK_ALIGN_VERT = 'CV_BLOCK_ALIGN_VERT';

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

const cvBlock_activate = function(blockId,target) {
    return {
        type: CV_BLOCK_ACTIVATE,
        blockId:blockId,
        target:target,
    };
}

const cvElement_activate = function(style,elementId) {
    return {
        type: CV_ELEMENT_ACTIVATE,
        elementId:elementId,
        style:style,
    };
}

const cvElement_update = function(blockId,elementId,styleName,styleValue) {
    return {
        type: CV_ELEMENT_UPDATE,
        blockId: blockId,
        elementId: elementId,
        styleName: styleName,
        styleValue: styleValue,
    };
}

const cvElement_textUpdate = function(blockId,elementId,textValue) {
    return {
        type: CV_TEXT_UPDATE,
        blockId: blockId,
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

const cvBlock_copy = function(blockId) {
    return {
        type: CV_BLOCK_COPY,
        blockId: blockId,
    };
}

const cvBlock_setSize = function(blockId,height,width) {
    return {
        type: CV_BLOCK_SET_SIZE,
        blockId: blockId,
        width:width,
        height:height,
    };
}

const cvBlock_activateMulti = function(blockId) {
    return {
        type: CV_BLOCK_ACTIVATE_MULTI,
        blockId: blockId,
    };
}

const cvBlock_alignTop = function() {
    return {
        type: CV_BLOCK_ALIGN_TOP,
    };
}

const cvBlock_alignLeft = function() {
    return {
        type: CV_BLOCK_ALIGN_LEFT,
    };
}

const cvBlock_alignVert = function() {
    return {
        type: CV_BLOCK_ALIGN_VERT,
    };
}

export {
    cvBlock_add, CV_BLOCK_ADD,
    cvBlock_delete, CV_BLOCK_DELETE,
    cvBlock_move, CV_BLOCK_MOVE,
    cvBlock_resize, CV_BLOCK_RESIZE,
    cvBlock_activate, CV_BLOCK_ACTIVATE,
    cvBlock_activateMulti, CV_BLOCK_ACTIVATE_MULTI,
    cvBlock_sendBack, CV_BLOCK_SEND_BACK,
    cvBlock_copy, CV_BLOCK_COPY,
    cvBlock_setSize, CV_BLOCK_SET_SIZE,
    cvBlock_alignTop, CV_BLOCK_ALIGN_TOP,
    cvBlock_alignLeft, CV_BLOCK_ALIGN_LEFT,
    cvBlock_alignVert, CV_BLOCK_ALIGN_VERT,
    cvElement_activate, CV_ELEMENT_ACTIVATE,
    cvElement_update, CV_ELEMENT_UPDATE,
    cvElement_textUpdate, CV_TEXT_UPDATE,
}
