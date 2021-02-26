import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import boardsReducer from './reducers/boardReducers'
import validateReducers from './reducers/validateReducers'

const rootReducer = combineReducers({
    board: boardsReducer,
    validate: validateReducers
})

const store = createStore(rootReducer, applyMiddleware(thunk))

console.log(store.getState());

export default store