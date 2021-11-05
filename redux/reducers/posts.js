import { FETCH_USER_POSTS } from "../constants"


export const postsReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_USER_POSTS:
            return action.posts
        default:
            return state
    }
}

