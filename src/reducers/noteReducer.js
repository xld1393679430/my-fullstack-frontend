const initialState = [
    {
      content: 'reducer defines how redux store works',
      important: true,
      id: 1,
    },
    {
      content: 'state of store can contain any data',
      important: false,
      id: 2,
    },
]

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