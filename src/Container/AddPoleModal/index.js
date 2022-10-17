import React from 'react'
import { Modal } from '../../Component'
import { Content } from './Component'
import './index.css'

const AddPoleModal = props =>{
    const { open, onClose } = props

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
            okButtonProps={{ className : 'save-button'}}
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
            <Content/>
        </Modal>
    )
}

AddPoleModal.defaultProps = {
    open : false,
    onClose : () => {},
}

export default AddPoleModal