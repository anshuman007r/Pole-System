import React, { useMemo } from "react";
import { Input, Typography, Tooltip } from "antd";
import './index.css'
import { DeleteFilled } from '@ant-design/icons'
import constants from "../../Constants";
const { 
    DELETE
} = constants

const { Text } = Typography

const checkType = (param) =>{
    return typeof param
}

const InputBox = props => {
    const { 
        label,
        width,
        height,
        inputWidth,
        deleteParams,
        marginTop,
        labelStyle,
        showDelIcon,
        disableDelIcon,
        onDeleteClick,
        ...rest
    } = props

    const paramFDelete = useMemo(()=> checkType(deleteParams) ? deleteParams : {}, [deleteParams])

    return (
        <div data-testid = "input-box-container" className="inputbox-container" style={{ height, width, marginTop : marginTop || 0}}>
            <Text data-testid="input-label" style={{ ...labelStyle}}>
                { label || ''}
            </Text>
            <Input  { ...rest} style={{ width : inputWidth || '100%'}}/>
            { 
                showDelIcon 
                ? 
                <Tooltip placement="bottom" title={DELETE}>
                    <DeleteFilled data-testid = "delete-icon" className={disableDelIcon ? "delete_icon" : ''} disabled={disableDelIcon} onClick={()=>!disableDelIcon ? onDeleteClick(paramFDelete) : null}/>
                </Tooltip> 
                : null 
            }
        </div>
    )

}

InputBox.defaultProps = {
    label : '',
    width : '80%',
    height : '36px',
    inputWidth : '100%',
    marginTop : '30px',
    labelStyle : {},
    showDelIcon : false,
    disableDelIcon : false,
    deleteParams : {},
    onDeleteClick : () => {}
}

export default InputBox