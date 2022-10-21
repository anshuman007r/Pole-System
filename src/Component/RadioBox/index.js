import React from "react";
import { Radio } from "antd";
import { Typography } from '../../Component'
import './index.css'

const RadioBox = props => {
    const { label, value, ...rest} = props
    return (
        <Radio value={value} { ...rest }>
            <Typography className="radio-label">{label || ''}</Typography>
        </Radio>
    )
}

RadioBox.defaultProps = {
    value : '',
    label : '',
}

export default RadioBox