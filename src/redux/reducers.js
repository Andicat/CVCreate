import { combineReducers } from 'redux';

import cvDataReducer from "./cvDataReducer";

let combinedReducer=combineReducers({
    cvData: cvDataReducer,
});

export default combinedReducer;
