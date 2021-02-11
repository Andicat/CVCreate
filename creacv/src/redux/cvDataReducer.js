import { CV_BLOCK_ADD, CV_BLOCK_DELETE, CV_BLOCK_MOVE, CV_BLOCK_ACTIVATE, CV_ELEMENT_ACTIVATE } from './cvDataAC';

const initState = {

  blocks: [],
  activeBlockId: null,
  activeElementId: null,
  //blockToEdit: null,
    /*    {type:'image', style:{width:'100px'}},
        {type:'text', text:'text simple', style:{fontsize:'12px',color:'black'}},
        {type:'group', elements:[
                {type:'text', text:'header', style:{fontsize:'18px',color:'red'}},
                {type:'text', text:'text color', style:{fontsize:'12px',color:'blue'}},
                {type:'text', text:'text simple', style:{fontsize:'12px',color:'black'}}
            ]},
        {type:'figure', style:{backgroundColor:'orange',width:'200px',height:'150px'}},
        {type:'group', elements:[
            {type:'text', text:'skill', style:{fontsize:'18px', fontWeight:'600', color:'black'}},
            {type:'group', elements:[
                {type:'figure', style:{backgroundColor:'orange',width:'10px',height:'10px', borderRadius:'50%'}},
                {type:'figure', style:{backgroundColor:'orange',width:'10px',height:'10px', borderRadius:'50%'}},
                {type:'figure', style:{backgroundColor:'orange',width:'10px',height:'10px', borderRadius:'50%'}}
            ]},
        ]},
    ]*/

}

// в редьюсере state - это не весь state Redux, а только тот раздел state,
// за который отвечает данный редьюсер

function cvDataReducer(state = initState, action) {
    //console.log('ACTION',action);
    switch (action.type) {

        case CV_BLOCK_ADD: {
            console.log('state до обработки редьюсером:',state);
            let newId = state.blocks.reduce(function (r, v) { return ( r < v.id ? v.id : r);},0) + 1;
            let newState={...state,
                blocks:[...state.blocks,{...action.block, id:newId}]
            };
            console.log('state после обработки редьюсером:',newState);
            return newState;
        }

        /*case CV_BLOCK_MOVE: {
            console.log('action:',action);
            console.log('state до обработки редьюсером:',state);
            let newState={...state};
            console.log('state после обработки редьюсером:',newState);
            return newState;
        }*/
    
        case CV_BLOCK_DELETE: {
            console.log('action:',action);
            console.log('state до обработки редьюсером:',state);
            let newState={...state,
                blocks:[...state.blocks,action.block]
            };
            console.log('state после обработки редьюсером:',newState);
            return newState;
        }

        case CV_BLOCK_ACTIVATE: {
            if (state.activeBlockId !== action.block.props.id) {
                console.log('action:',action);
                //console.log('state до обработки редьюсером:',state);
                let newState = {...state, activeBlockId:action.block.props.id};
                console.log('state после обработки редьюсером:',newState);
                return newState;
            }
            return state;
        }

        case CV_ELEMENT_ACTIVATE: {
            if (state.activeElementId !== action.block.props.id) {
                console.log('action:',action);
                //console.log('state до обработки редьюсером:',state);
                let newState = {...state, activeElementId:action.block.props.id};
                console.log('state после обработки редьюсером:',newState);
                return newState;
            }
            return state;
        }

        default:
            return state;
    }
}

export default cvDataReducer;
