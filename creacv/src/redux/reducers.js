import { combineReducers } from 'redux';

//import countersReducer from "./countersReducer";
import cvDataReducer from "./cvDataReducer";

let combinedReducer=combineReducers({
    // редьюсер countersReducer отвечает за раздел state под именем counters
    //counters: countersReducer, 
    cvData: cvDataReducer, 
    // + другие редьюсеры
});

export default combinedReducer;
