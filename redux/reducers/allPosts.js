import { FETCH_ALL_POSTS } from "../constants"


export const allPostsReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_ALL_POSTS:
            return action.posts
        default:
            return state
    }
}

