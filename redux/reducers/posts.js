import { FETCH_USER_POSTS } from "../constants"
import { EDIT_OPACITY_POST_USER } from "../constants"

export const postsReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_USER_POSTS:
            return action.posts
        case EDIT_OPACITY_POST_USER:
            return state.filter(post => post.id === action.post.id ? action.post : post)
        default:
            return state
    }
}

