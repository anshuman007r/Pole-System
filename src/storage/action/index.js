import { 
    ADD_USER, 
    LOG_IN_USER, 
    LOG_OUT,
    ADD_POLE,
    MODIFY_POLE,
    DELETE_POLE,
    CLEAR_POLE
} from '../constant'

const AddUser = payload =>{
    return {
        type : ADD_USER,
        payload
    }
}

const LogInUser = payload =>{
    return{
        type : LOG_IN_USER,
        payload
    }
}

const LogOutUser = () =>{
    return {
        type : LOG_OUT
    }
}

const AddPole = payload =>{
    return {
        type : ADD_POLE,
        payload
    }
}

const ModifyPole = payload =>{
    return {
        type : MODIFY_POLE,
        payload
    }
}

const DeletePole = payload =>{
    return{
        type : DELETE_POLE,
        payload
    }
}

const ClearPole = payload =>{
    return{
        type : CLEAR_POLE,
    }
}

export {
    AddUser,
    LogInUser,
    LogOutUser,
    AddPole,
    DeletePole,
    ModifyPole,
    ClearPole
}