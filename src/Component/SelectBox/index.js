import React from 'react'
import { Select, Typography  } from 'antd'
const { Option } = Select

const SelectBox = props => {
    const { 
        label = '',
        width = '80%',
        height = '36px',
        inputWidth = 'calc(100% - 150px)',
        ...rest

    } = props
    return (
        <div style={{ display : 'flex', height, width, justifyContent : 'space-between', marginTop : '30px',  alignItems : 'center'}}>
            <Typography>
                { label || ''}
            </Typography>
            <Select { ...rest} style={{ width : inputWidth || '100%', height : '34px'}} >
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
            </Select>
        </div>
    )
}

export default SelectBox