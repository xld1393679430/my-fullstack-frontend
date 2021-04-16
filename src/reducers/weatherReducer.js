const initialState = {};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_WEATHER':
            return action.data;
        default:
            return state;
    }
};

export default weatherReducer;