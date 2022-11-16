import { render, screen} from "@testing-library/react";
import InputBox from "../../Component/InputBox";

const compSetup = (props = {}) =>  render(<InputBox { ...props }/>)

test('component rendered without error', () => {
    compSetup({})
    const container = screen.queryByTestId('input-box-container')
    expect(container).toBeInTheDocument()
})

describe('rendering of deleteIcon',() =>{
    test('delete icon should be rendered when showDelIcon props is true', () =>{
        compSetup({ showDelIcon : true})
        const container = screen.queryByTestId('delete-icon')
        expect(container).toBeInTheDocument()
    })

    test('delete icon should not be rendered when showDelIcon props is false', () => {
        compSetup({ showDelIcon : false})
        const container = screen.queryByTestId('delete-icon')
        expect(container).not.toBeInTheDocument()
    })

    test('by default delete icon should not render', () => {
        compSetup({})
        const container = screen.queryByTestId('delete-icon')
        expect(container).not.toBeInTheDocument()
    })
})

describe('rendering of input label', () => {
    test('by default input label should show empty string', () => {
        compSetup({})
        const container = screen.queryByTestId('input-label')
        expect(container.textContent).toBe('')
    })
    test('when passing a props as label the content of label node should match with the value in props', () => {
        const label = 'Name'
        compSetup({ label })
        const container = screen.queryByTestId('input-label')
        expect(container.textContent).toBe(label)
    })
})

