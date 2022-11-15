import { fireEvent, render, screen} from "@testing-library/react";
import RadioBox from "../Component/RadioBox";

const compSetup = (props = {}) =>  render(<RadioBox { ...props }/>)

test('component rendered without error', () => {
    compSetup({})
    const container = screen.queryByTestId('radio-box-container')
    expect(container).toBeInTheDocument()
})

//ant-radio-checked

describe('rendering of radio box',() =>{
    test('by default radio box should not be selected', () =>{
        const {container} =  compSetup({})
        const radioBox = screen.queryByTestId('radio-box-container')
        const radioWrapper = container.getElementsByClassName('ant-radio')
        expect(radioWrapper[0]).not.toHaveClass('ant-radio-checked')
        
    })
    test('on click of radio box, it should be selected', () => {
        const {container} = compSetup({})
        const radioBox = screen.queryByTestId('radio-box-container')
        fireEvent.click(radioBox)
        const radioWrapper = container.getElementsByClassName('ant-radio')
        expect(radioWrapper[0]).toHaveClass('ant-radio-checked')
    })
})

describe('rendering of radio box label', () => {
    test('by default radio box label should show empty string', () => {
        compSetup({})
        const container = screen.queryByTestId('radio-box-label')
        expect(container.textContent).toBe('')
    })
    test('when passing a props as label the content of label node should match with the value in props', () => {
        const label = 'Role'
        compSetup({ label })
        const container = screen.queryByTestId('radio-box-label')
        expect(container.textContent).toBe(label)
    })
})

