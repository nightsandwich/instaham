import { combineReducers } from "redux";
import { userReducer } from './user';
import { postsReducer } from "./posts";
import { allPostsReducer } from "./allPosts"
import { allUsersReducer } from './allUsers'

const Reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
    allPosts: allPostsReducer,
    users: allUsersReducer
})

export default Reducers;