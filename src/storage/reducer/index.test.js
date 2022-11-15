import { loggedUserReducer, usersReducer, poleReducer } from "../reducer";
import { 
    ADD_POLE, 
    ADD_USER, 
    CLEAR_POLE, 
    DELETE_POLE, 
    LOG_IN_USER, 
    LOG_OUT, 
    MODIFY_POLE 
} from '../constant'

import poleJSON from '../../JsonData/addPole.json'


describe('test logged user reducer',()=>{
    let state 
    beforeEach(()=>{
        state={
            userName : 'anshuman',
            password : 'welcome@123'
        }
    })
    test('on passing log in action it should update state',() =>{
        const action = {
            type : LOG_IN_USER,
            payload : state
        }
        const updatedState = loggedUserReducer({}, action)
        expect(updatedState).toStrictEqual(state)
    })  
    test('on passing log out acton it should clear action', () =>{
        const action = {
            type : LOG_OUT,
            payload : {}
        }
        const updatedState = loggedUserReducer({}, action)
        expect(updatedState).toStrictEqual({})
    })
    test('on passing in valid action it should return the current state',()=>{
        const updatedState = loggedUserReducer({})
        expect(updatedState).toStrictEqual({})
    })  
})

describe('test user reducer',()=>{
    let state 
    beforeEach(()=>{
        state={
            userName : 'anshuman',
            password : 'welcome@123'
        }
    })
    test('on passing add user action it should update state',() =>{
        const action = {
            type : ADD_USER,
            payload : state
        }
        const updatedState = usersReducer([], action)
        expect(updatedState).toStrictEqual([state])
    })  
    test('on passing in valid action it should return the current state',()=>{
        const updatedState = usersReducer([state])
        expect(updatedState).toStrictEqual([state])
    }) 
})

describe('test pole reducer',()=>{
    let state 
    beforeEach(()=>{
        state=poleJSON
    })
    test('on passing add pole action it should update state by adding new pole',() =>{
        const action = {
            type : ADD_POLE,
            payload : state
        }
        const updatedState = poleReducer([], action)
        expect(updatedState).toStrictEqual([state])
    }) 
    test('on passing modify pole action it should update state by modifying the existing pole',() =>{
        const updatedPole = {  ...state, pole_name : 'Updating pole'}
        const payload = { updatedPole, poleIndex : 0}
        const action = {
            type : MODIFY_POLE,
            payload 
        }
        const updatedState = poleReducer([state], action)
        expect(updatedState).toStrictEqual([updatedPole])
    }) 
    test('on passing delete pole action it should update state by deleting the particular pole',() =>{
        const action = {
            type : DELETE_POLE,
            payload  : { id : state.pole_id }
        }
        const updatedState = poleReducer([state], action)
        expect(updatedState).toStrictEqual([])
    })  
    test('on passing clear pole action it should clear the list of  pole',() =>{
        const action = {
            type : CLEAR_POLE,
        }
        const updatedState = poleReducer([state], action)
        expect(updatedState).toStrictEqual([])
    })      
    test('on passing in valid action it should return the current state',()=>{
        const updatedState = usersReducer([])
        expect(updatedState).toStrictEqual([])
    }) 

})
