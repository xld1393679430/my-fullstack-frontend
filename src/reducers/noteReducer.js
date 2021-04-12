const initialState = []

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_NOTE':
            return action.data
        case 'NEW_NOTE':
            return [...state, action.data]
        case 'TOGGLE_IMPORTANCE':
            return action.data
        default:
            return state
    }
}

export default noteReducer