import { combineReducers } from "redux";
import { user } from './user';

const Reducers = combineReducers({
    currentUser: user
})

export default Reducers;