import React, { useState, useRef} from 'react'
import { Modal } from '../../Component'
import { useDispatch } from 'react-redux'
import { Content } from './Component'
import { AddPole, ClearPole } from '../../storage/action'

import './index.css'

const AddPoleModal = props =>{
    const { open, onClose } = props
    const [disableAdd, setDisableAdd] = useState(true)
    const dispatch = useDispatch()
    window['contentRef'] = useRef(null)
    const { contentRef } = window

    const onDisableAdd = (value = false)=>{
        setDisableAdd(value)
    }

    const onSave = () =>{
        // dispatch(ClearPole())
        const { poleData = {} } = contentRef?.current  || {}
        // console.log(poleData)
        dispatch(AddPole( poleData ))
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
                ref={contentRef}
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