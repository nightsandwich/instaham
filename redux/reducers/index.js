import { combineReducers } from "redux";
import { userReducer } from './user';
import { postsReducer } from "./posts";
import { allPostsReducer } from "./allPosts"

const Reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
    allPosts: allPostsReducer
})

export default Reducers;