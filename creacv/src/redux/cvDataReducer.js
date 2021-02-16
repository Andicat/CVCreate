import { CV_BLOCK_ADD,
        CV_BLOCK_DELETE,
        CV_BLOCK_MOVE,
        CV_BLOCK_RESIZE,
        CV_BLOCK_ACTIVATE,
        CV_BLOCK_SEND_BACK,
        CV_ELEMENT_ACTIVATE,
        CV_ELEMENT_UPDATE,
        CV_TEXT_UPDATE } from './cvDataAC';

const initState = {
    blocks: [],
    activeBlockId: null,
    activeElementId: null,
    styleToEdit: {},
}

function cvDataReducer(state = initState, action) {
    //debugger

    switch (action.type) {

        //add new block to cv-page
        case CV_BLOCK_ADD: {
            let newId = state.blocks.reduce(function (r, v) { return ( r < v.id ? v.id : r);},0) + 1;
            let newState = {...state,
                blocks: [...state.blocks,{...action.block, id:newId, positionTop:'30',positionLeft:'30',width:'100',height:'100'}],
                activeBlockId: newId,
                activeElementId: null
            };
            return newState;
        }

        //delete block to cv-page
        case CV_BLOCK_DELETE: {
            let newState = {...state,
                blocks: state.blocks.filter(b => b.id!==action.blockId),
                activeBlockId: null,
                activeElementId: null
            };
            return newState;
        }

        //move block on cv-page
        case CV_BLOCK_MOVE: {
            let newBlocks = state.blocks.map(b => {
                if (b.id===state.activeBlockId) {
                    b.positionTop = Number(b.positionTop) + action.shiftTop;
                    b.positionLeft = Number(b.positionLeft) + action.shiftLeft;
                    return {...b};
                }
                return b});
            let newState = {...state, blocks:newBlocks};
            return newState;
        }

        //set size for block on cv-page
        case CV_BLOCK_RESIZE: {
            let newBlocks = state.blocks.map(b => {
                if (b.id===state.activeBlockId) {
                    b.height = Number(b.height) + action.shiftHeight;    
                    b.width = Number(b.width) + action.shiftWidth;
                    return {...b};
                }
                return b});
            let newState = {...state, blocks:newBlocks};
            return newState;
        }

        //activate block on cv-page
        case CV_BLOCK_ACTIVATE: {
            if (state.activeBlockId !== action.blockId) {
                let newState = {...state, activeBlockId:action.blockId, activeElementId:(action.blockId?state.activeElementId:null)};
                return newState;
            }
            return state;
        }

        //send block on back of cv-page
        case CV_BLOCK_SEND_BACK: {
            let sortFunc = function(a,b) {  
                return a.id === state.activeBlockId ? -1 : b.id == state.activeBlockId ? 1 : 0;  
              }
            let newBlocks = [...state.blocks].sort(sortFunc);
            let newState = {...state, blocks:newBlocks};
            return newState;
        }

        //activate element on cv-page
        case CV_ELEMENT_ACTIVATE: {
            if (state.activeElementId !== action.elementId) {
                let newState = {...state, activeElementId:action.elementId, styleToEdit:action.style};
                return newState;
            }
            return state;
        }

        //update elements style
        case CV_ELEMENT_UPDATE: {
            let newStyleToEdit = {};
            let newBlocks = state.blocks.map(b => {
                if (b.id===state.activeBlockId) {
                    if (b.elements) {
                        b.elements = b.elements.map((e,i) => {
                            if (('' + state.activeBlockId + i)===('' + state.activeElementId)) {
                                e.style[action.styleName] = action.styleValue;
                                e.style = {...e.style};
                                newStyleToEdit = e.style;
                                return {...e};
                            };
                            return e;
                        });
                    } else {
                        b.style[action.styleName] = action.styleValue;
                        b.style = {...b.style};
                        newStyleToEdit = b.style;
                        
                    }
                    return {...b};
                }
                return b});
            let newState = {...state, blocks:newBlocks,styleToEdit:newStyleToEdit};
            return newState;
        }
        
        //update elements text
        case CV_TEXT_UPDATE: {
            let newBlocks = state.blocks.map(b => {
                if (b.id===state.activeBlockId) {
                    if (b.elements) {
                        b.elements = b.elements.map((e,i) => {
                            if (('' + state.activeBlockId + i)===('' + state.activeElementId)) {
                                e.text = action.textValue;
                                return {...e};
                            };
                            return e;
                        });
                    } else {
                        b.text = action.textValue;
                    }
                    return {...b};
                }
                return b});
            let newState = {...state, blocks:newBlocks};
            return newState;
        }
        default:
            return state;
    }
}

export default cvDataReducer;
