import React from 'react'
import { Radio } from 'antd'
const RadioGroup = props => {
    const { children } = props
    return (
        <Radio.Group>
            {children}
        </Radio.Group>
    )
}

export default RadioGroup