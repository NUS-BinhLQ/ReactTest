
const initialState = {
    persons: [],
}

const personReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_PERSONS': {

            return {
                ...state,
                persons: action.payload
            };
        }

        default:
            return state;
    }
}
export default personReducer;