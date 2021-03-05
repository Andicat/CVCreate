const CV_BLOCK_ADD = 'CV_BLOCK_ADD';
const CV_BLOCK_DELETE = 'CV_BLOCK_DELETE';
const CV_BLOCK_MOVE = 'CV_BLOCK_MOVE';
const CV_BLOCK_RESIZE = 'CV_BLOCK_RESIZE';
const CV_BLOCK_ACTIVATE = 'CV_BLOCK_ACTIVATE';
const CV_BLOCK_ACTIVATE_MULTI = 'CV_BLOCK_ACTIVATE_MULTI';
const CV_BLOCK_COPY = 'CV_BLOCK_COPY';
const CV_BLOCK_SET_SIZE = 'CV_BLOCK_SET_SIZE';
const CV_ELEMENT_ACTIVATE = 'CV_ELEMENT_ACTIVATE';
const CV_STYLE_UPDATE = 'CV_STYLE_UPDATE';
const CV_TEXT_UPDATE = 'CV_TEXT_UPDATE';
const CV_BLOCK_SEND_BACK = 'CV_BLOCK_SEND_BACK';
const CV_BLOCKS_ALIGN_TOP = 'CV_BLOCKS_ALIGN_TOP';
const CV_BLOCKS_ALIGN_BOTTOM = 'CV_BLOCKS_ALIGN_BOTTOM';
const CV_BLOCKS_ALIGN_LEFT = 'CV_BLOCKS_ALIGN_LEFT';
const CV_BLOCKS_ALIGN_RIGHT = 'CV_BLOCKS_ALIGN_RIGHT';
const CV_BLOCKS_ALIGN_VERTICAL = 'CV_BLOCKS_ALIGN_VERTICAL';
const CV_BLOCKS_ALIGN_HORISONTAL = 'CV_BLOCKS_ALIGN_HORISONTAL';
const CV_BLOCKS_DISTRIBUTE_VERTICAL = 'CV_BLOCKS_DISTRIBUTE_VERTICAL';
const CV_BLOCKS_DISTRIBUTE_HORISONTAL = 'CV_BLOCKS_DISTRIBUTE_HORISONTAL';
const CV_BLOCKS_ALIGN_WIDTH = 'CV_BLOCKS_ALIGN_WIDTH';
const CV_BLOCKS_ALIGN_HEIGHT = 'CV_BLOCKS_ALIGN_HEIGHT';
const CV_BLOCKS_GROUP = 'CV_BLOCKS_GROUP';
const CV_BLOCK_UNGROUP = 'CV_BLOCK_UNGROUP';
const CV_BLOCK_LOCK = 'CV_BLOCK_LOCK';
const CV_LOAD = 'CV_LOAD';
const CV_INIT = 'CV_INIT';
const CV_SET_USER = 'CV_SET_USER';
const CV_SET_LINK = 'CV_SET_LINK';
const CV_BLOCK_LINK = 'CV_BLOCK_LINK';
const TEMPLATE_ADD = 'TEMPLATE_ADD';

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

const cvStyle_update = function(blockId,styleName,styleValue) {
    return {
        type: CV_STYLE_UPDATE,
        blockId: blockId,
        styleName: styleName,
        styleValue: styleValue,
    };
}

const cvElement_textUpdate = function(blockId,textValue) {
    return {
        type: CV_TEXT_UPDATE,
        blockId: blockId,
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

const cvBlocks_align = function(mode) {
    switch (mode) {
        case 'top':
            return { type: CV_BLOCKS_ALIGN_TOP };
        case 'bottom':
            return { type: CV_BLOCKS_ALIGN_BOTTOM };
        case 'left':
            return { type: CV_BLOCKS_ALIGN_LEFT };
        case 'right':
            return { type: CV_BLOCKS_ALIGN_RIGHT };
        case 'vertical':
            return { type: CV_BLOCKS_ALIGN_VERTICAL };
        case 'horisontal':
            return { type: CV_BLOCKS_ALIGN_HORISONTAL };
        default:
    }
}

const cvBlocks_distribute = function(mode) {
    switch (mode) {
        case 'vertical':
            return { type: CV_BLOCKS_DISTRIBUTE_VERTICAL };
        case 'horisontal':
            return { type: CV_BLOCKS_DISTRIBUTE_HORISONTAL };
        default:
    }
}

const cvBlocks_alignSize = function(mode) {
    switch (mode) {
        case 'width':
            return { type: CV_BLOCKS_ALIGN_WIDTH };
        case 'height':
            return { type: CV_BLOCKS_ALIGN_HEIGHT };
        default:
    }
}

const cvBlocks_group = function() {
    return { type: CV_BLOCKS_GROUP };
}

const cvBlock_ungroup = function(blockId) {
    return { 
        type: CV_BLOCK_UNGROUP,
        blockId: blockId,
    };
}

const cvBlock_lock = function(blockId) {
    return { 
        type: CV_BLOCK_LOCK,
        blockId: blockId,
    };
}

const cv_load = function(blocks,style) {
    return { 
        type: CV_LOAD,
        blocks:blocks,
        style:style,
    };
}

const cv_init = function(blocks,style,user,link,templatesData,templatesUser) {
    return { 
        type: CV_INIT,
        blocks:blocks,
        style:style,
        user:user,
        link:link,
        templatesData:templatesData,
        templatesUser:templatesUser,
    };
}

const cv_setUser = function(user) {
    return { 
        type: CV_SET_USER,
        user:user,
    };
}

const cv_setLink = function(link) {
    return { 
        type: CV_SET_LINK,
        link:link,
    };
}

const cvBlock_setLink = function(blockId,linkValue) {
    return { 
        type: CV_BLOCK_LINK,
        blockId:blockId,
        linkValue:linkValue,
    };
}

const templates_add = function(blockId) {
    return {
        type: TEMPLATE_ADD,
        blockId: blockId,
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
    cvBlock_lock, CV_BLOCK_LOCK,
    cvBlock_setLink, CV_BLOCK_LINK,
    cvBlocks_align, CV_BLOCKS_ALIGN_TOP, CV_BLOCKS_ALIGN_BOTTOM, CV_BLOCKS_ALIGN_LEFT, CV_BLOCKS_ALIGN_RIGHT, CV_BLOCKS_ALIGN_VERTICAL, CV_BLOCKS_ALIGN_HORISONTAL,
    cvBlocks_distribute, CV_BLOCKS_DISTRIBUTE_VERTICAL, CV_BLOCKS_DISTRIBUTE_HORISONTAL,
    cvBlocks_alignSize, CV_BLOCKS_ALIGN_WIDTH, CV_BLOCKS_ALIGN_HEIGHT,
    cvBlocks_group, CV_BLOCKS_GROUP, 
    cvBlock_ungroup, CV_BLOCK_UNGROUP,
    cvElement_activate, CV_ELEMENT_ACTIVATE,
    cvStyle_update, CV_STYLE_UPDATE,
    cvElement_textUpdate, CV_TEXT_UPDATE,
    cv_load, CV_LOAD,
    cv_init, CV_INIT, 
    cv_setUser, CV_SET_USER,
    cv_setLink, CV_SET_LINK,
    templates_add, TEMPLATE_ADD
}
