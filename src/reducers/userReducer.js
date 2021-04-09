const initialState = null

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        case 'UPDATE':
            return action.data
        default:
            return state
    }
}

export default userReducer