import React, { useMemo} from 'react'
import { DatePicker as DateTimePicker, Typography } from 'antd'
import './index.css'
import moment from 'moment'

const { Text } = Typography

function isValidDate(d) {
    return d instanceof moment && !isNaN(d);
  }

const DatePicker = props => {
    const { 
        label,
        width = '80%',
        value,
        height,
        options,
        labelStyle,
        inputWidth,
        ...rest

    } = props

    const dateValue = useMemo(() => isValidDate(value) ? value : '', [value])

    return (
        <div data-testid = 'date-picker-container' className='datepicker-container' style={{ height , width }}>
            <Text data-testid = "date-picker-label" style={{ ...labelStyle}}>
                { label || ''}
            </Text> 
            <DateTimePicker value={dateValue} data-testid = "date-picker" { ...rest} style={{ width : inputWidth || '100%', height : '34px'}} />
        </div>
    )
}

DatePicker.defaultProps ={
    label : '',
    width : '80%',
    height : '36px',
    inputWidth : 'calc(100% - 150px)',
    labelStyle : {},
    options : [],
    value : moment()
}

export default DatePicker