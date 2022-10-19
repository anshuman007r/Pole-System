import React, { useState, useRef} from 'react'
import { Modal, Alert } from '../../Component'
import { useDispatch } from 'react-redux'
import { Content } from './Component'
import { 
    AddPole, 
    // ClearPole 
} from '../../storage/action'

import './index.css'
import moment from 'moment'

const validateDate = (date = '') =>{
    if(moment(date, 'YYYY/MM/DD')?.isValid()){
        const currentDateMillSec = moment().valueOf()
        const selectedDateMillSec = moment(date, 'YYYY/MM/DD').valueOf()
        if(currentDateMillSec > selectedDateMillSec){
            return 'Closing date should be greater than current date'
        }else{
            return 'Valid'
        }
    }else{
        return 'Invalid Date'
    }
}

const AddPoleModal = props =>{
    const { open, onClose, onErrorOccur, error, onCloseError } = props
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
        const { closing_date = ''} = poleData || {}
        const dateMessage = validateDate(closing_date)
        if(dateMessage === 'Valid'){
            dispatch(AddPole( poleData ))
            onClose()
        }else{
            onErrorOccur(dateMessage)
        }
        // console.log(poleData)

    }
    
    return(
        <React.Fragment>

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
                {error &&
                    <Alert
                        message = {error || 'Something went wrong'}
                        banner
                        type = "error"
                        closable
                        afterClose={onCloseError}
                        className='error-box-modal'
                    />
                }
                <Content
                    ref={contentRef}
                    onDisableAdd = {onDisableAdd}
                />
            </Modal>
        </React.Fragment>
    )
}

AddPoleModal.defaultProps = {
    open : false,
    onClose : () => {},
    error : '',
    onErrorOccur : () => {},
    onCloseError : () => {}
}

export default AddPoleModal