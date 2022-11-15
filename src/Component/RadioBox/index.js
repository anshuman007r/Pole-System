import React from "react";
import { Radio } from "antd";
import { Typography } from '../../Component'
import './index.css'

const RadioBox = props => {
    const { label, value, ...rest} = props
    return (
        <Radio data-testid = "radio-box-container" value={value} { ...rest }>
            <Typography.Text data-testid = "radio-box-label" className="radio-label">{label || ''}</Typography.Text>
        </Radio>
    )
}

RadioBox.defaultProps = {
    value : '',
    label : '',
}

export default RadioBox