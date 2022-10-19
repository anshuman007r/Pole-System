import React from 'react'
import { DatePicker as DateTimePicker, Typography } from 'antd'

const DatePicker = props => {
    const { 
        label,
        width = '80%',
        height,
        options,
        labelStyle,
        inputWidth,
        ...rest

    } = props
    return (
        <div style={{ display : 'flex', height, width, justifyContent : 'space-between', marginTop : '30px',  alignItems : 'center'}}>
            <Typography style={{ ...labelStyle}}>
                { label || ''}
            </Typography>
            <DateTimePicker { ...rest} style={{ width : inputWidth || '100%', height : '34px'}} />
        </div>
    )
}

DatePicker.defaultProps ={
    label : '',
    width : '80%',
    height : '36px',
    inputWidth : 'calc(100% - 150px)',
    labelStyle : {},
    options : []
}

export default DatePicker