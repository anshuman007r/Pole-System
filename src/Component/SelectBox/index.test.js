import { fireEvent, render, screen} from "@testing-library/react";
import SelectBox from "../SelectBox";

const compSetup = (props = {}) =>  render(<SelectBox { ...props }/>)

test('component rendered without error', () => {
    compSetup({})
    const container = screen.queryByTestId('select-box-container')
    expect(container).toBeInTheDocument()
})

describe('rendering of select box',() =>{
    const optionList = [
        {
            id : '1',
            label : 'test option 1',
            value : 'test 1'
        },
        {
            id : '2',
            label : 'test option 1',
            value : 'test 2'          
        }
    ]
    test('by default no value should be selected', () =>{
        compSetup({ options : []})
        const selectBox = screen.queryByTestId('select-box')
        expect(selectBox.select).toBeUndefined()
    })
    test('on change select box should have the selected value', () => {
        compSetup({ options : optionList })
        const selectBox = screen.queryByRole('combobox')
        fireEvent.change(selectBox, {target : { value : 'test 1'}})
        expect(screen.getByText('test 1')).toBeInTheDocument()
    })
})

describe('rendering of select box label', () => {
    test('by default select box label should show empty string', () => {
        compSetup({})
        const container = screen.queryByTestId('select-box-label')
        expect(container.textContent).toBe('')
    })
    test('when passing a props as label the content of label node should match with the value in props', () => {
        const label = 'Role'
        compSetup({ label })
        const container = screen.queryByTestId('select-box-label')
        expect(container.textContent).toBe(label)
    })
})

