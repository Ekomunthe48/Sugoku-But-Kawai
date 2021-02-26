const initialState = {
    validateBoards: null,
    sugokuDone: null
}

const validateReducers =  (state = initialState, action) => {
    switch (action.type) {
        case 'BOARD_VALIDATE':
            return {
                ...state,
                validateBoards: action.payload
            }
        case 'BOARD_SOLVE' :
            return {
                ...state,
                sugokuDone: action.payload
            }
        default:
            return state
    }
}

export default validateReducers