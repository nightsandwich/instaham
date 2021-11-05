import { combineReducers } from "redux";
import { userReducer } from './user';
import { postsReducer } from "./posts";

const Reducers = combineReducers({
    user: userReducer,
    posts: postsReducer
})

export default Reducers;