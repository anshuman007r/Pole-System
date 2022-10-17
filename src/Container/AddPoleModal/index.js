import React, { useState} from 'react'
import { Modal } from '../../Component'
import { Content } from './Component'
import './index.css'

const AddPoleModal = props =>{
    const { open, onClose } = props
    const [disableAdd, setDisableAdd] = useState(true)

    const onDisableAdd = (value = false)=>{
        setDisableAdd(value)
    }

    const onSave = ( ) =>{
        console.log('#Save')
        onClose()
    }

    return(
        <Modal
            open={open}
            onOk={onSave}
            okText="Add"
            cancelButtonProps={{ className : 'cancel-button'}}
            okButtonProps={{ className : 'save-button', disabled : disableAdd}}
            bodyStyle={{
                height : '56vh',
                overflow : 'auto'
            }}
            destroyOnClose
            onCancel={onClose}
            width={1000}
            // height={10400}
            title="Add Pole"
        >
            <Content
                onDisableAdd = {onDisableAdd}
            />
        </Modal>
    )
}

AddPoleModal.defaultProps = {
    open : false,
    onClose : () => {},
}

export default AddPoleModal