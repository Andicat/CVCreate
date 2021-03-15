import {CV_ID} from './../modules/utils';
import {saveFirebase} from './../components/withDataLoad';

import {
    CV_BLOCK_ADD,
    CV_BLOCK_DELETE,
    CV_BLOCK_MOVE,
    CV_BLOCK_RESIZE,
    CV_BLOCK_ACTIVATE,
    CV_BLOCK_ACTIVATE_MULTI,
    CV_BLOCK_SEND_BACK,
    CV_BLOCK_COPY,
    CV_BLOCK_SET_SIZE,
    CV_BLOCK_LOCK,
    CV_BLOCK_LINK,
    CV_BLOCKS_ALIGN_TOP,
    CV_BLOCKS_ALIGN_BOTTOM,
    CV_BLOCKS_ALIGN_LEFT,
    CV_BLOCKS_ALIGN_RIGHT,
    CV_BLOCKS_ALIGN_VERTICAL,
    CV_BLOCKS_ALIGN_HORISONTAL,
    CV_BLOCKS_DISTRIBUTE_VERTICAL,
    CV_BLOCKS_DISTRIBUTE_HORISONTAL,
    CV_BLOCKS_ALIGN_WIDTH,
    CV_BLOCKS_ALIGN_HEIGHT,
    CV_BLOCKS_GROUP,
    CV_BLOCK_UNGROUP,
    CV_ELEMENT_ACTIVATE,
    CV_STYLE_UPDATE,
    CV_TEXT_UPDATE,
    CV_LOAD,
    CV_INIT,
    CV_SET_USER,
    CV_SET_LINK,
    TEMPLATE_ADD,
    TEMPLATE_DELETE,
    TEMPLATE_OPEN_PANEL } from './cvDataAC';

const initState = {
    user: null,
    link: null,
    stylePage: {bgcolor: '#ffffff'},
    blocks: [],
    activeBlockDOM: null,
    activeBlocksId: [],
    activeElementId: null,
    styleToEdit: {},
    showPanel: true,
    newBlock: false,
    templates: [],
    templatesUser: [],
    templateImageUrl: null,
};

function cvDataReducer(state = initState, action, cvId = CV_ID) {

    switch (action.type) {

    //add new block to cv-page
    case CV_BLOCK_ADD: {
        function setId(block,parentId,index = 0) {
            if (!parentId) {
                block.id = newId;
            } else {
                block.id = parentId + '-' + index;
            }
            if (block.elements) {
                block.elements.forEach((e,i) => setId(e,block.id,i));
            }
        }

        let newId = state.blocks.reduce(function (r, v) { return ( r < v.id ? v.id : r);},0) + 1;
        let randomPositionTop = action.scrollTop + 50 + Math.random()*100;
        let randomPositionLeft = action.scrollLeft + 50 + Math.random()*100;
        let newBlock = {...action.block, positionTop: randomPositionTop,positionLeft: randomPositionLeft};
        if (newBlock.style) {
            delete newBlock.style.height;
            delete newBlock.style.width;
        }
        setId(newBlock);
        let newState = {...state,
            blocks: [...state.blocks,newBlock],
            activeBlocksId: [newId],
            activeBlockDOM: null,
            activeElementId: null,
            newBlock: true,
        };
        return newState;
    }

    //delete block to cv-page
    case CV_BLOCK_DELETE: {
        let newState = {...state,
            blocks: state.blocks.filter(b => b.id!==action.blockId),
            activeBlocksId: [],
            activeBlockDOM: null,
            activeElementId: null,
            newBlock: false,
        };
        return newState;
    }

    //move block on cv-page
    case CV_BLOCK_MOVE: {
        let newBlocks = state.blocks.map(b => {
            if (b.id === action.blockId) {
                b.positionTop = Number(b.positionTop) + action.shiftTop;
                b.positionLeft = Number(b.positionLeft) + action.shiftLeft;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
            newBlock: false,
        };
        return newState;
    }

    //set size for block on cv-page
    case CV_BLOCK_RESIZE: {
        let newBlocks = state.blocks.map(b => {
            if (b.id===action.blockId) {
                //debugger
                b.height = Number(b.height) + action.shiftHeight;
                b.width = Number(b.width) + action.shiftWidth;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
            newBlock: false,
        };
        return newState;
    }

    //activate block on cv-page
    case CV_BLOCK_ACTIVATE: {
        let newActiveBlocksId = [];
        if (action.blockId) {
            newActiveBlocksId.push(action.blockId);
        }
        let newState = {...state,
            activeBlocksId: newActiveBlocksId,
            activeBlockDOM: action.target,
            activeElementId: (action.activeElem?state.activeElementId:null),
            newBlock: false,
        };
        return newState;
    }

    //activate/disactivate blocks on cv-page
    case CV_BLOCK_ACTIVATE_MULTI: {
        let newActiveBlocksId;
        if (state.activeBlocksId.find(b => b===action.blockId)) {
            newActiveBlocksId = state.activeBlocksId.filter( b => b!==action.blockId);
        } else {
            newActiveBlocksId = [...state.activeBlocksId,action.blockId];
        }
        let newState = {...state,
            activeBlocksId: newActiveBlocksId,
            activeBlockDOM: null,
            activeElementId: null,
            newBlock: false,
        };
        return newState;
    }

    //align blocks on top
    case CV_BLOCKS_ALIGN_TOP: {
        let firstActiveBlock = state.blocks.find(b => b.id===state.activeBlocksId[0]);
        let positionTop = firstActiveBlock.positionTop;
        let newBlocks = state.blocks.map(b => {
            if (state.activeBlocksId.find(ab => b.id===ab)) {
                b.positionTop = positionTop;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //align blocks on bottom
    case CV_BLOCKS_ALIGN_BOTTOM: {
        let firstActiveBlock = state.blocks.find(b => b.id===state.activeBlocksId[0]);
        let positionBottom = firstActiveBlock.positionTop + firstActiveBlock.height;
        let newBlocks = state.blocks.map(b => {
            if (state.activeBlocksId.find(ab => b.id===ab)) {
                b.positionTop = positionBottom - b.height;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //align blocks on left
    case CV_BLOCKS_ALIGN_LEFT: {
        let firstActiveBlock = state.blocks.find(b => b.id===state.activeBlocksId[0]);
        let positionLeft = firstActiveBlock.positionLeft;
        let newBlocks = state.blocks.map(b => {
            if (state.activeBlocksId.find(ab => b.id===ab)) {
                b.positionLeft = positionLeft;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //align blocks on right
    case CV_BLOCKS_ALIGN_RIGHT: {
        let firstActiveBlock = state.blocks.find(b => b.id===state.activeBlocksId[0]);
        let positionRight = firstActiveBlock.positionLeft + firstActiveBlock.width;
        let newBlocks = state.blocks.map(b => {
            if (state.activeBlocksId.find(ab => b.id===ab)) {
                b.positionLeft = positionRight - b.width;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //align blocks on vertical
    case CV_BLOCKS_ALIGN_VERTICAL: {
        let firstActiveBlock = state.blocks.find(b => b.id===state.activeBlocksId[0]);
        let positionCenter = firstActiveBlock.positionLeft + firstActiveBlock.width/2;
        let newBlocks = state.blocks.map(b => {
            if (state.activeBlocksId.find(ab => b.id===ab)) {
                b.positionLeft = positionCenter - b.width/2;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //align blocks on horisontal
    case CV_BLOCKS_ALIGN_HORISONTAL: {
        let firstActiveBlock = state.blocks.find(b => b.id===state.activeBlocksId[0]);
        let positionCenter = firstActiveBlock.positionTop + firstActiveBlock.height/2;
        let newBlocks = state.blocks.map(b => {
            if (state.activeBlocksId.find(ab => b.id===ab)) {
                b.positionTop = positionCenter - b.height/2;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //align blocks on same width
    case CV_BLOCKS_ALIGN_WIDTH: {
        let firstActiveBlock = state.blocks.find(b => b.id===state.activeBlocksId[0]);
        let width = firstActiveBlock.width;
        let newBlocks = state.blocks.map(b => {
            if (state.activeBlocksId.find(ab => b.id===ab)) {
                b.width = width;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //align blocks on same height
    case CV_BLOCKS_ALIGN_HEIGHT: {
        let firstActiveBlock = state.blocks.find(b => b.id===state.activeBlocksId[0]);
        let height = firstActiveBlock.height;
        let newBlocks = state.blocks.map(b => {
            if (state.activeBlocksId.find(ab => b.id===ab)) {
                b.height = height;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks
        };
        return newState;
    }

    //distribute blocks on vertical
    case CV_BLOCKS_DISTRIBUTE_VERTICAL: {
        let blocksToAlign = state.blocks.filter( b => state.activeBlocksId.find(ab => b.id===ab)).sort((a,b) => a.positionTop-b.positionTop);
        let minTop = blocksToAlign[0].positionTop + blocksToAlign[0].height;
        let maxTop = blocksToAlign[blocksToAlign.length-1].positionTop;

        blocksToAlign = blocksToAlign.slice(1,blocksToAlign.length-1);

        let totalHeight = blocksToAlign.reduce((r,b) => r + b.height,0);
        let distance = (maxTop-minTop-totalHeight)/(blocksToAlign.length+1);

        blocksToAlign = blocksToAlign.map(b => {
            b.positionTop = minTop + distance;
            minTop = b.positionTop + b.height;
            return b;
        });

        let newBlocks = state.blocks.map(b => {
            let newBlock = blocksToAlign.find(ab => b.id===ab.id);
            if (newBlock) {
                return {...newBlock};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //distribute blocks on horisontal
    case CV_BLOCKS_DISTRIBUTE_HORISONTAL: {
        let blocksToAlign = state.blocks.filter( b => state.activeBlocksId.find(ab => b.id===ab)).sort((a,b) => a.positionLeft-b.positionLeft);
        let minLeft = blocksToAlign[0].positionLeft + blocksToAlign[0].width;
        let maxLeft = blocksToAlign[blocksToAlign.length-1].positionLeft;

        blocksToAlign = blocksToAlign.slice(1,blocksToAlign.length-1);

        let totalWidth = blocksToAlign.reduce((r,b) => r + b.width,0);
        let distance = (maxLeft-minLeft-totalWidth)/(blocksToAlign.length+1);

        blocksToAlign = blocksToAlign.map(b => {
            b.positionLeft = minLeft + distance;
            minLeft = b.positionLeft + b.width;
            return b;
        });

        let newBlocks = state.blocks.map(b => {
            let newBlock = blocksToAlign.find(ab => b.id===ab.id);
            if (newBlock) {
                return {...newBlock};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //group blocks
    case CV_BLOCKS_GROUP: {
        let blocksToGroup = state.blocks.filter( b => state.activeBlocksId.find(ab => b.id===ab));
        let top = Infinity;
        let bottom = 0;
        let left = Infinity;
        let right = 0;

        blocksToGroup.forEach( b => {
            top = (b.positionTop<top)?b.positionTop:top;
            bottom = ((b.positionTop+b.height)>bottom)?(b.positionTop+b.height):bottom;
            left = (b.positionLeft<left)?b.positionLeft:left;
            right = ((b.positionLeft+b.width)>right)?(b.positionLeft+b.width):right;
        });

        let newElements = blocksToGroup.map( b => {
            //let elemWidth = b.width;
            //let elemHeight = b.height;
            let elemTop = b.positionTop - top;
            let elemLeft = b.positionLeft - left;
            delete b.positionTop;
            delete b.positionLeft;
            return {...b, style: {...b.style, position: 'absolute', top: elemTop, left: elemLeft}};
        });

        let newId = state.blocks.reduce(function (r, v) { return ( r < v.id ? v.id : r);},0) + 1;
        let newGroupBlock = {type: 'group', group: true, direction: 'absolute', id: newId, height: (bottom-top), width: (right-left), positionTop: top, positionLeft: left};
        newGroupBlock.elements = newElements;
        let newBlocks = state.blocks.filter(b => !state.activeBlocksId.find(ab => b.id===ab));
        let newState = {...state,
            blocks: [...newBlocks,newGroupBlock],
            activeBlocksId: [newId],
            activeBlockDOM: null,
            activeElementId: null,
        };
        return newState;
    }

    //ungroup block
    case CV_BLOCK_UNGROUP: {
        let blockToUnGroup = state.blocks.find(b => b.id===action.blockId);
        let top = blockToUnGroup.positionTop;
        let left = blockToUnGroup.positionLeft;

        let newBlocks = blockToUnGroup.elements.map( (b,i) => {
            let newId = state.blocks.reduce(function (r, v) { return ( r < v.id ? v.id : r);},0) + 1 + i;
            let positionTop = top + b.style.top;
            let positionLeft = left + b.style.left;
            delete b.style.top;
            delete b.style.left;
            delete b.style.width;
            delete b.style.height;
            delete b.style.position;
            return {...b, id: newId, positionTop: positionTop, positionLeft: positionLeft};
        });

        let newState = {...state,
            blocks: [...state.blocks.filter(b => b.id!==action.blockId),...newBlocks],
            activeBlocksId: [],
            activeBlockDOM: null,
            activeElementId: null,
        };
        return newState;
    }

    //send block on back of cv-page
    case CV_BLOCK_SEND_BACK: {
        let sortFunc = function(a,b) {
            return a.id === action.blockId ? -1 : b.id === action.blockId ? 1 : 0;
        };
        let newBlocks = [...state.blocks].sort(sortFunc);
        let newState = {...state,
            blocks: newBlocks,
            activeBlocksId: [],
            activeBlockDOM: null,
            activeElementId: null,
        };
        return newState;
    }

    //copy block
    case CV_BLOCK_COPY: {
        function copyBlock(blockTemp,parentId,index = 0) {
            let block = {...blockTemp, style: {...blockTemp.style}};
            if (!parentId) {
                block.id = newId;
            } else {
                block.id = parentId + '-' + index;
            }
            if (block.elements) {
                block.elements = block.elements.map((e,i) => copyBlock(e,block.id,i));
            }
            return block;
        };

        let newId = state.blocks.reduce(function (r, v) { return ( r < v.id ? v.id : r);},0) + 1;
        let activeBlock = state.blocks.find(b => b.id===action.blockId);
        let newBlock = copyBlock(activeBlock);
        newBlock.positionTop = activeBlock.positionTop + 30;
        newBlock.positionLeft = activeBlock.positionLeft + 30;
        let newState = {...state,
            blocks: [...state.blocks,newBlock],
            activeBlocksId: [newId],
            activeBlockDOM: null,
            activeElementId: null,
        };
        return newState;
    }

    //set width, height for block
    case CV_BLOCK_SET_SIZE: {
        let newBlocks = state.blocks.map(b => {
            if (b.id===action.blockId) {
                if (action.width) {
                    b.width = Number(action.width);
                }
                if (action.height) {
                    b.height = Number(action.height);
                }
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //lock block position on cv-page
    case CV_BLOCK_LOCK: {
        let newBlocks = state.blocks.map(b => {
            if (b.id===action.blockId) {
                b.lock = !b.lock;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //wrap block with link
    case CV_BLOCK_LINK: {
        let newBlocks = state.blocks.map(b => {
            if (b.id===action.blockId) {
                b.link = action.linkValue;
                return {...b};
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //activate element on cv-page
    case CV_ELEMENT_ACTIVATE: {
        if (state.activeElementId !== action.elementId) {
            let newState = {...state,
                activeElementId: action.elementId,
                styleToEdit: action.style,
            };
            return newState;
        }
        return state;
    }

    //update elements style
    case CV_STYLE_UPDATE: {
        function updateStyle(block) {
            if (block.id==state.activeElementId) {
                block.style[action.styleName] = action.styleValue;
                block.style = {...block.style};
                newStyleToEdit = block.style;
                return {...block};
            }
            if (block.elements) {
                block.elements = block.elements.map(e => updateStyle(e));
                return {...block};
            }
            return block;
        }
        if (action.blockId===cvId) {
            state.stylePage[action.styleName] = action.styleValue;
            let newState = {...state,
                stylePage: {...state.stylePage},
            };
            return newState;
        }
        let newStyleToEdit = {};
        let newBlocks = state.blocks.map(b => {
            if (b.id === action.blockId) {
                let newBlock = updateStyle(b);
                return newBlock;
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
            styleToEdit: newStyleToEdit,
        };
        return newState;
    }

    //update elements text
    case CV_TEXT_UPDATE: {
        function updateText(block) {
            if (block.id == state.activeElementId) {
                block.text = action.textValue;
                return {...block};
            }
            if (block.elements) {
                block.elements = block.elements.map(e => updateText(e));
                return {...block};
            }
            return block;
        }
        let newBlocks = state.blocks.map(b => {
            if (b.id === action.blockId) {
                let newBlock = updateText(b);
                return newBlock;
            }
            return b;});
        let newState = {...state,
            blocks: newBlocks,
        };
        return newState;
    }

    //load CV-doc from json
    case CV_LOAD: {
        let newState = {...state,
            stylePage: action.style,
            blocks: action.blocks,
        };
        return newState;
    }

    //initialize CV
    case CV_INIT: {
        let newState = {...state,
            user: action.user,
            templates: action.templatesData.templates,
            templateImageUrl: action.templatesData.image,
            templatesUser: action.templatesUser,
        };
        if (action.style) {
            newState.stylePage = action.style;
        };
        if (action.blocks) {
            newState.blocks = action.blocks;
        };
        if (action.link) {
            newState.link = action.link;
        };
        return newState;
    }

    //set user name
    case CV_SET_USER: {
        let newState = {...state,
            user: action.user,
        };
        return newState;
    }

    //set link
    case CV_SET_LINK: {
        let newState = {...state,
            link: action.link,
        };
        return newState;
    }

    //add template
    case TEMPLATE_ADD: {
        let activeBlock = state.blocks.find(b => b.id===action.blockId);
        let newTemplateBlock = {type: activeBlock.type, style: {...activeBlock.style,height: activeBlock.height,width: activeBlock.width}};
        if (activeBlock.text) {
            newTemplateBlock.text = activeBlock.text;
        }
        if (activeBlock.elements) {
            newTemplateBlock.elements = [...activeBlock.elements];
        }
        if (activeBlock.direction) {
            newTemplateBlock.direction = activeBlock.direction;
        }
        if (activeBlock.group) {
            newTemplateBlock.group = activeBlock.group;
        }

        let newState = {...state,
            templatesUser: [...state.templatesUser,newTemplateBlock],
        };
        saveFirebase('Templates',state.user,{templates: newState.templatesUser});
        return newState;
    }

    //delete template
    case TEMPLATE_DELETE: {
        let newState = {...state,
            templatesUser: state.templatesUser.filter((t,i) => i!==action.index),
        };
        saveFirebase('Templates',state.user,{templates: newState.templatesUser});
        return newState;
    }

    //open-close templates panel
    case TEMPLATE_OPEN_PANEL: {
        let newState = {...state,
            showPanel: !state.showPanel,
        };
        return newState;
    }

    default:
        return state;
    }
}

export default cvDataReducer;
