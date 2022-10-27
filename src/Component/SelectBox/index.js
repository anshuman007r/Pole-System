import React from 'react'
import { Select, Typography  } from 'antd'
import './index.css'
const { Option } = Select


const SelectBox = props => {
    const { 
        label,
        width = '80%',
        height,
        options,
        inputWidth,
        ...rest

    } = props
    return (
        <div style={{height, width}} className="selectbox-container">
            <Typography>
                { label || ''}
            </Typography>
            <Select { ...rest} style={{ width : inputWidth || '100%', height : '34px'}} >
                {
                    options?.map(({id, label , value}, index)=>(
                        <Option key={id || index} value={value || ''}>{label || ''}</Option>
                    ))
                }
            </Select>
        </div>
    )
}

SelectBox.defaultProps ={
    label : '',
    width : '80%',
    height : '36px',
    inputWidth : 'calc(100% - 150px)',
    options : []
}

export default SelectBox