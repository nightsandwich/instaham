import { FETCH_ALL_USERS } from "../constants"

export const allUsersReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_ALL_USERS:
            return action.users
        default:
            return state
    }
}

