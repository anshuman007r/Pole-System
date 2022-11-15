import { isPoleExpire } from "../helper";
import moment from 'moment'

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