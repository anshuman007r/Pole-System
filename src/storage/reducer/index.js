import { combineReducers } from 'redux'
import { 
    ADD_POLE, 
    ADD_USER, 
    CLEAR_POLE, 
    DELETE_POLE, 
    LOG_IN_USER, 
    LOG_OUT, 
    MODIFY_POLE 
} from '../constant'

const usersReducer = (state = [], action) =>{
    switch(action.type){
        case ADD_USER:
            return [ ...state, action?.payload]
        default : 
            return state   
    }
}

const loggedUserReducer = (state = {}, action) =>{
    switch(action?.type){
        case LOG_IN_USER : 
            return action?.payload
        case LOG_OUT : 
            return {}
        default :
            return state
    }
}

const poleReducer = ( state = [], action) =>{
    switch(action?.type){
        case ADD_POLE : 
            return [ ...state, action?.payload]
        case MODIFY_POLE : 
            state[action?.payload?.poleIndex] = action?.payload?.updatedPole
            return [ ...state]
        case CLEAR_POLE : 
            return []
        case DELETE_POLE : 
            return state?.filter(pole => pole?.pole_id !== action?.payload?.id) 
        default : 
            return state 
    }
}

export default combineReducers({
    loggedUserReducer,
    poleReducer,
    usersReducer
})