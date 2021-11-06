import { FETCH_USER_POSTS } from "../constants"
import { EDIT_OPACITY_POST_USER } from "../constants"

export const postsReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_USER_POSTS:
            return action.posts
        case EDIT_OPACITY_POST_USER:
            return state.filter(post => post.id === action.userPost.id ? action.userPost : post)
        default:
            return state
    }
}

