import React, { useState, useRef, useMemo } from 'react'
import { Modal, Alert } from '../../Component'
import { useDispatch, useSelector } from 'react-redux'
import { Content } from './Component'
import { 
    AddPole, ModifyPole, 
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

const validatePoleName = (nameFPole, poleDataArr, type = 'Add') => {
    const nameExist = poleDataArr?.find(pole => pole?.pole_name === nameFPole)
    return nameExist && type === 'Add' ?  'Pole name already exist' : false
}

const AddPoleModal = props =>{
    const { open, onClose, onErrorOccur, error, onCloseError } = props
    const [disableAdd, setDisableAdd] = useState(true)
    const { poleReducer : poles } = useSelector(state => state)
    const dispatch = useDispatch()
    window['contentRef'] = useRef(null)
    const { contentRef } = window
    const pole = useMemo(()=>open?.poleId ? poles?.find(pole=> pole?.pole_id === open?.poleId) : '',[open, poles])

    const onDisableAdd = (value = false)=>{
        setDisableAdd(value)
    }

    const onSave = () =>{
        // dispatch(ClearPole())
        const { poleData = {} } = contentRef?.current  || {}
        const { closing_date = '', pole_name = ''} = poleData || {}
        const errorMessage = validatePoleName(pole_name, poles, open?.type) || validateDate(closing_date)

        if(errorMessage === 'Valid'){
        
            if(!pole) dispatch(AddPole( poleData ))
            else{
                const poleIndex = poles?.findIndex(pol => pol?.pole_id === poleData?.pole_id)
                if(poleIndex !== - 1) dispatch(ModifyPole({ updatedPole : { ...poleData }, poleIndex}))
            }
            onClose()
        }else{
            onErrorOccur(errorMessage)
        }
    }
    
    return(
        <React.Fragment>

            <Modal
                open={open?.state}
                onOk={onSave}
                okText={open?.type === 'Add' ? "Add" : 'Edit'}
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
                title={open?.type === 'Add' ? "Add Pole" : 'Edit Pole'}
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
                    pole = {pole}
                />
            </Modal>
        </React.Fragment>
    )
}

AddPoleModal.defaultProps = {
    open : { state : false, type : 'Add'},
    onClose : () => {},
    error : '',
    onErrorOccur : () => {},
    onCloseError : () => {}
}

export default AddPoleModal