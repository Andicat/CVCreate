import { CV_BLOCK_ADD } from './cvDataAC';

const initState = {

  blocks: [
        {type:'image', src:'', style:{width:'100px', height:'100px', backgroundColor:'blue'}},
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
    ]

}

// в редьюсере state - это не весь state Redux, а только тот раздел state,
// за который отвечает данный редьюсер

function cvDataReducer(state=initState,action) {
//console.log(state);
    switch (action.type) {

        case CV_BLOCK_ADD: {
            // надо создать новый блок
            // редьюсер ВСЕГДА должен возвращаеть новый state а не изменять старый!
            console.log('action:',action);
            console.log('state до обработки редьюсером:',state);
            let newState={...state,
                blocks:[...state.blocks,action.newBlock]
            };
            console.log('state после обработки редьюсером:',newState);
            return newState;
        }
    
    /*case COUNTER_BUTTON_ADD: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newState={...state,
        cnts:{...state.cnts,
          [action.counterid]:state.cnts[action.counterid]+action.addvalue
        }
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }*/

        default:
            return state;
    }
}

export default cvDataReducer;
