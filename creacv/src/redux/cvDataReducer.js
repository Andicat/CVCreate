import { CV_BLOCK_ADD,
        CV_BLOCK_DELETE,
        CV_BLOCK_MOVE,
        CV_BLOCK_RESIZE,
        CV_BLOCK_ACTIVATE,
        CV_ELEMENT_ACTIVATE,
        CV_ELEMENT_UPDATE,
        CV_TEXT_UPDATE } from './cvDataAC';

const initState = {
    blocks: [],
    activeBlockId: null,
    activeElementId: null,
    styleToEdit: null,
}

function cvDataReducer(state = initState, action) {

    switch (action.type) {

        case CV_BLOCK_ADD: {
            let newId = state.blocks.reduce(function (r, v) { return ( r < v.id ? v.id : r);},0) + 1;
            let newState={...state,
                blocks:[...state.blocks,{...action.block, id:newId, positionTop:'30',positionLeft:'30',width:'100',height:'100'}]
            };
            return newState;
        }

        case CV_BLOCK_MOVE: {
            let newBlocks = state.blocks.map(b => {
                if (b.id===state.activeBlockId) {
                    b.positionTop = action.positionTop;
                    b.positionLeft = action.positionLeft;    
                    return {...b};
                }
                return b});
            let newState = {...state, blocks:newBlocks};
            return newState;
        }

        case CV_BLOCK_RESIZE: {
            let newBlocks = state.blocks.map(b => {
                if (b.id===state.activeBlockId) {
                    b.width = Number(b.width) + action.width;
                    b.height = Number(b.height) + action.height;    
                    return {...b};
                }
                return b});
            let newState = {...state, blocks:newBlocks};
            return newState;
        }

        case CV_BLOCK_DELETE: {
            let newState={...state,
                blocks:state.blocks.filter(b => b.id!==action.blockId)
            };
            return newState;
        }

        case CV_BLOCK_ACTIVATE: {
            if (state.activeBlockId !== action.blockId) {
                //console.log('activate block', action.blockId);
                let newState = {...state, activeBlockId:action.blockId};
                return newState;
            }
            return state;
        }

        case CV_ELEMENT_ACTIVATE: {
            //let fullId = '' + state.activeBlockId + state.activeElementId; 
            if (state.activeElementId !== action.elementId) {
                //console.log('activate element', action.elementId);
                let newState = {...state, activeElementId:action.elementId, styleToEdit:action.style};
                //console.log('state после обработки редьюсером:',newState.styleToEdit);
                return newState;
            }
            return state;
        }

        case CV_ELEMENT_UPDATE: {
            let newStyleToEdit = {};
            let newBlocks = state.blocks.map(b => {
                if (b.id===state.activeBlockId) {
                    if (b.elements) {
                        /*b.elements[state.activeElementId] = {...b.elements[state.activeElementId]}
                        b.elements[state.activeElementId].style[action.styleName] = action.styleValue;
                        b.elements[state.activeElementId].style = {... b.elements[state.activeElementId].style};
                        newStyleToEdit = b.elements[state.activeElementId].style;
                        //console.log(elll)
                        b.elements = [...b.elements];*/
                        //debugger
                        b.elements = b.elements.map((e,i) => {
                            if (('' + state.activeBlockId + i)===('' + state.activeElementId)) {
                                e.style[action.styleName] = action.styleValue;
                                e.style = {...e.style};
                                newStyleToEdit = e.style;
                                return {...e};
                            };
                            return e;
                        });
                        //.;
                    } else {
                        b.style[action.styleName] = action.styleValue;
                        b.style = {...b.style};
                        newStyleToEdit = b.style;
                        
                    }
                    //console.log('style before change',b)
                    //console.log('style after change',{...b})
                    return {...b};
                }
                return b});
                //console.log(state.blocks===newBlocks);
            let newState = {...state, blocks:newBlocks,styleToEdit:newStyleToEdit};
                //console.log(state===newState);
                //console.log('style name',action.styleName);
                //console.log('style value',action.styleValue);
                //console.log('state после обработки редьюсером:',newState);
            return newState;
            //}
            //return state;
        }

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

                        //.;
                    } else {
                        b.text = action.textValue;
                    }
                    //console.log('style before change',b)
                    //console.log('style after change',{...b})
                    return {...b};
                }
                return b});
                //console.log(state.blocks===newBlocks);
            let newState = {...state, blocks:newBlocks};
                //console.log(state===newState);
                //console.log('style name',action.styleName);
                //console.log('style value',action.styleValue);
                //console.log('state после обработки редьюсером:',newState);
            return newState;
            //}
            //return state;
        }

        default:
            return state;
    }
}

export default cvDataReducer;
