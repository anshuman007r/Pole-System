import moment from "moment"
import { createStore } from "redux"
import reducer from "../storage/reducer";

const getTimeStamp = (date) => moment(date, 'YYYY/MM/DD').valueOf() 

const isPoleExpire = ({ closing_date = '', ...rest}) => {
    const isClosingDateValid = moment(closing_date)?.isValid() ? getTimeStamp(closing_date) !== 'Invalid date' : false
    if(isClosingDateValid){
        const closeDateMillSec = getTimeStamp(closing_date)
        const currentDateMillSec = getTimeStamp(moment().format('YYYY/MM/DD'))
        // console.log(closing_date, moment().format('YYYY/MM/DD'), currentDateMillSec, closeDateMillSec, closeDateMillSec <= currentDateMillSec)
        return closeDateMillSec <= currentDateMillSec
    }
    return true
}

const getUniqueNumber = ()=>{
    return Math.random(moment()?.valueOf())*moment().valueOf()
}

const storeFactory = (initialState) => createStore(reducer, initialState)

export {
    isPoleExpire,
    getTimeStamp,
    storeFactory,
    getUniqueNumber
}