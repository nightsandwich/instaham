import { FETCH_ALL_POSTS } from "../constants"
import { EDIT_OPACITY_POST } from "../constants"

export const allPostsReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_ALL_POSTS:
            return action.posts
        case EDIT_OPACITY_POST:
            return state.filter(post => post.id === action.post.id ? action.post : post)
        default:
            return state
    }
}

