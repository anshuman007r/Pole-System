import React from 'react'
import { DatePicker as DateTimePicker, Typography } from 'antd'
import './index.css'

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
        <div className='datepicker-container' style={{ height , width }}>
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