const initialState = {
    boards: null
}

const boardsReducer =  (state = initialState, action) => {
    switch (action.type) {
        case 'BOARD_FETCH':
            return {
                ...state,
                boards: action.payload
            }
        default:
            return state
    }
}

export default boardsReducer