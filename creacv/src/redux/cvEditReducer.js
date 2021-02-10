import { CV_EDIT } from './cvEditAC';

const initState = {
}

// в редьюсере state - это не весь state Redux, а только тот раздел state,
// за который отвечает данный редьюсер

function cvEditReducer(state=initState,action) {
    //console.log('ACTION',action);
    switch (action.type) {

        /*case CV_EDIT: {
            // надо создать новый блок
            // редьюсер ВСЕГДА должен возвращаеть новый state а не изменять старый!
            //console.log('action:',action);
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

export default cvEditReducer;
