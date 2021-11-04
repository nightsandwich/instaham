
export const user = (state = {}, action) => (
    {
        ...state,
        currentUser: action.currentUser
    }
)