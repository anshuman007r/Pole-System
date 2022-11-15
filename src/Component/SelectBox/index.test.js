import { fireEvent, render, screen} from "@testing-library/react";
import SelectBox from "../SelectBox";
import userEvent from '@testing-library/user-event'

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
        const selectBox = screen.queryByTestId('select-box')
        userEvent.selectOptions(selectBox, 'test 1')
        console.log('selectBox',selectBox.select)
        expect(selectBox.select).toHaveValue(optionList[0]?.value)
    })
    describe('render of options', () => {
        test('no option should be loaded when options is a blank array',() =>{
            compSetup({ options : []})
            const optionsNode = screen.queryAllByTestId('select-box-option')
            expect(optionsNode).toHaveLength(0)
        })
        test('correct count of options should be rendered on passing a list of options', () =>{
            compSetup({ options : optionList})
            const selectBox = screen.queryByTestId('select-box')
            const options = selectBox.querySelectorAll('option');
            console.log('opt',options)
            const optionsNode = screen.queryAllByTestId('select-box-option')

            expect(optionsNode).toHaveLength(0)
        })
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

