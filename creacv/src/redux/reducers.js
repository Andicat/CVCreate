import { combineReducers } from 'redux';

import cvDataReducer from "./cvDataReducer";
import cvEditReducer from "./cvEditReducer";

let combinedReducer=combineReducers({
    cvData: cvDataReducer, 
    cvEdit: cvEditReducer, 
});

export default combinedReducer;
