import { USER_STATE_CHANGE } from "../constants"

export const userReducer = (state = null, action) => {
    switch(action.type){
        case USER_STATE_CHANGE:
            return action.user
        default:
            return state
    }
}