import { FETCH_ALL_POSTS } from "../constants"
import { EDIT_OPACITY_POST, EDIT_CAPTION } from "../constants"

export const allPostsReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_ALL_POSTS:
            return action.posts
        case EDIT_OPACITY_POST:
            return state.filter(post => post.id === action.post.id ? action.post : post)
        case EDIT_CAPTION:
            return state.filter(post => post.id === action.post.id ? action.post : post)
        default:
            return state
    }
}

