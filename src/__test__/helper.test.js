import { isPoleExpire, getTimeStamp, getUniqueNumber, storeFactory } from "../helper";
import { LogInUser } from "../storage/action";
import moment from 'moment'

describe('isPoleExpire function', () =>{
    test('when passing closing date invalid it should return true',() =>{
        const closing_date = null
        const value = isPoleExpire({closing_date})
        expect(value).toBeTruthy()
    })
    
    test('when passing closing date lower than current date it should return false',() => {
        const closing_date = moment().add(1, 'days').format('YYYY/MM/DD')
        const value = isPoleExpire({closing_date})
        expect(value).toBeFalsy()
    })
    
    test('when passing closing date lower than current date it should return true',() =>{
        const closing_date = moment().subtract(1, 'days').format('YYYY/MM/DD')
        const value = isPoleExpire({closing_date})
        expect(value).toBeTruthy()
    })
})

describe('getTimeStamp function', () =>{
    test('by default it should return invalid date',()=>{
        const timeStamp = getTimeStamp()
        expect(timeStamp).toBe('Invalid date')
    })
    test('on passing invalid date it should return invalid date',()=>{
        const timeStamp = getTimeStamp('hello')
        expect(timeStamp).toBe('Invalid date')
    })
    test('on passing valid date it should return time stamp',()=>{
        const timeStamp = getTimeStamp('2022/11/21')
        expect(timeStamp).not.toBe('Invalid date')
    })
})

describe('getUnique number function', ()=>{
    test('type of return statement should be number',()=>{
        const typeFUniqueNum = typeof getUniqueNumber()
        expect(typeFUniqueNum).toBe('number')
    })
    test("two unique number shouldn't match",()=>{
        const uniqueNum1 = getUniqueNumber()
        const uniqueNum2 = getUniqueNumber()
        expect(uniqueNum1).not.toBe(uniqueNum2)
    })
})

describe('storeFactory function', ()=>{
    const mockState = {
        loggedUserReducer : {},
        usersReducer : [],
        poleReducer : []
    }
    test('by default it should return the default state',()=>{
        const store = storeFactory({})
        const state = store.getState()
        expect(state).toStrictEqual(mockState)
    })
    test('when we are passing some object value in initial State it should return the same from getState function', ()=>{
        const loggedUserReducerMock = { userName : 'Ankit', role : 'user', firstName : 'Ankit', lastName : "Kumar"}
        const store = storeFactory({loggedUserReducer :loggedUserReducerMock})
        const state = store.getState()
        const testMockState = {
            ...mockState,
            loggedUserReducer : loggedUserReducerMock
        }
        expect(state).toStrictEqual(testMockState) 
    })
    test("when dispatching any action it should return the updated state",()=>{
        const loggedUserReducerMock = { userName : 'Ankit', role : 'user', firstName : 'Ankit', lastName : "Kumar"}
        const store = storeFactory({})
        store.dispatch(LogInUser(loggedUserReducerMock))
        const state = store.getState()
        const testMockState = {
            ...mockState,
            loggedUserReducer : loggedUserReducerMock
        }
        expect(state).toStrictEqual(testMockState) 
    })
})