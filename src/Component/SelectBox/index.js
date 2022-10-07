import React from 'react'
import { Select, Typography  } from 'antd'
const { Option } = Select

const SelectBox = props => {
    const { 
        label = '',
        width = '80%',
        height = '36px'
    } = props
    return (
        <div style={{ display : 'flex', height, width, justifyContent : 'space-between', marginTop : '30px',  alignItems : 'center'}}>
            <Typography>
                { label || ''}
            </Typography>
            <Select style={{ width : 'calc(100% - 100px)', height : '34px'}}>
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
            </Select>
        </div>
    )
}

export default SelectBox