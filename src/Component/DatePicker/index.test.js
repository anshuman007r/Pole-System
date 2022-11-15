import DatePicker from "../DatePicker";
import { render, screen } from "@testing-library/react";
import moment from 'moment'


const compSetup = (props = {}) =>  render(<DatePicker { ...props }/>)

test('component rendered without error', () => {
    compSetup({})
    const container = screen.queryByTestId('date-picker-container')
    expect(container).toBeInTheDocument()
})

describe('rendering of date picker',() =>{
    test('by default it should return empty Value', () =>{
        compSetup({})
        const datePicker = screen.queryByTestId('date-picker')
        expect(datePicker.value).toMatch('')
    })

    test('when passing a invalid date it should return invalid date', () => {     
        compSetup({value : 'date'})
        const datePicker = screen.queryByTestId('date-picker')
        expect(datePicker.value).toMatch('')
    })

    test('when passing a valid date it should return the same', () => {
        const datePickerVal = moment()
        compSetup({ value : datePickerVal})
        const datePicker = screen.queryByTestId('date-picker')
        expect(datePicker.value).toMatch(moment(datePickerVal).format('YYYY-MM-DD'))
    })
})

describe('rendering of date picker label', () => {
    test('by default date picker label should show empty string', () => {
        compSetup({})
        const container = screen.queryByTestId('date-picker-label')
        expect(container.textContent).toBe('')
    })
    test('when passing a props as label the content of label node should match with the value in props', () => {
        const label = 'Date'
        compSetup({ label })
        const container = screen.queryByTestId('date-picker-label')
        expect(container.textContent).toBe(label)
    })
})

