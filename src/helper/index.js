import moment from "moment"
import { createStore } from "redux"
import reducer from "../storage/reducer";

const getTimeStamp = (date = '') => moment(moment(date, 'YYYY/MM/DD'),moment.ISO_8601)?.isValid() ?  moment(date, 'YYYY/MM/DD').valueOf() : 'Invalid date' 

const isPoleExpire = ({ closing_date = '', ...rest}) => {
    const isoFormClosingDate = moment(closing_date, 'YYYY/MM/DD')
    const isClosingDateValid = moment(isoFormClosingDate,  moment.ISO_8601)?.isValid() ? getTimeStamp(closing_date) !== 'Invalid date' : false
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

function isValidDate(d) {
    return d instanceof moment && !isNaN(d);
  }

export {
    isPoleExpire,
    getTimeStamp,
    storeFactory,
    getUniqueNumber,
    isValidDate
}