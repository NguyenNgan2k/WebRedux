import { combineReducers } from "redux";
import reducer from "./reducer";
import {reducer as form} from 'redux-form'
const rootReducers = combineReducers({
    reducer,
    form
});
export default rootReducers;