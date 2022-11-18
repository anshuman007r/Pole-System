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
import constants from '../../Constants'
const {
    ADD,
    EDIT,
    EDIT_POLE,
    ADD_POLE,
    CLOSE_DATE_ERROR,
    VALID,
    INVALID_DATE,
    POLE_NAME_ALREADY_EXIST,
    SOMETHING_WENT_WRONG
 } = constants

const validateDate = (date = '') =>{
    if(moment(date, 'YYYY/MM/DD')?.isValid()){
        const currentDateMillSec = moment().valueOf()
        const selectedDateMillSec = moment(date, 'YYYY/MM/DD').valueOf()
        if(currentDateMillSec > selectedDateMillSec){
            return CLOSE_DATE_ERROR
        }else{
            return VALID
        }
    }else{
        return INVALID_DATE
    }
}

const validatePoleName = (nameFPole, poleDataArr, type = ADD) => {
    const nameExist = poleDataArr?.find(pole => pole?.pole_name === nameFPole)
    return nameExist && type === ADD ?  POLE_NAME_ALREADY_EXIST : false
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

        if(errorMessage === VALID){
        
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
            {
                open?.state ? 
                <Modal
                    open={open?.state}
                    onOk={onSave}
                    data-testid = "modal-container"
                    okText={open?.type === ADD ? ADD : EDIT}
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
                    title={open?.type === ADD ? ADD_POLE : EDIT_POLE}
                >
                        {error &&
                            <Alert
                                message = {error || SOMETHING_WENT_WRONG}
                                banner
                                data-testid = "modal-error"
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
                </Modal> : null
            }

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