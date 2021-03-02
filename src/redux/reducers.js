import { combineReducers } from 'redux';

import cvDataReducer from "./cvDataReducer";
import templatesDataReducer from "./templatesDataReducer";

let combinedReducer=combineReducers({
    cvData: cvDataReducer,
    templatesData: templatesDataReducer,
});

export default combinedReducer;
