import React, { useState, useMemo, useEffect } from "react";
import { List, Header } from '../../Component'
import { useSelector, useDispatch } from "react-redux";
import AddPoleModal from "../AddPoleModal";
import moment from 'moment'
// import { ClearPole } from "../../storage/action";

const isPoleExpire = ({ closing_date = ''}) => {
    if(moment(closing_date)?.isValid){
        const closeDateMillSec = moment(closing_date)?.valueOf()
        const currentDateMillSec = moment()?.valueOf()
        return closeDateMillSec <= currentDateMillSec
    }
    return true
}

const OpenPole = props =>{
    const [openModal, setOpenModal] = useState({ type : 'Add', state : '', poleId : ''})
    const [error, setError] = useState('')
    const { poleReducer : poles } = useSelector(state => state)

    const openPoles = useMemo(() => Array.isArray(poles) ? poles?.filter(pole=>!isPoleExpire(pole || {})) : [],[poles])

    const toggleModal = (type = 'Add', poleId = '') =>{
        setOpenModal(prevState => ({ type, poleId, state : !prevState?.state}))
    } 

    const onCloseError = () =>{
        setError('')
    }

    const onErrorOccur = (err) =>{
        setError(err || '')
        closeErrorAuto()
    }

    const closeErrorAuto = () =>{
        setTimeout(onCloseError,5000)
    }

    return(
        <>
            <Header
                page = "Open Poles"
                onOpenModal = {toggleModal}
                { ...props}
            />
            <List
                page = "Open Poles"
                list = {openPoles || []} 
                onEdit = {toggleModal}
            />
            <AddPoleModal
                open={openModal}
                onClose={toggleModal}
                error={error}
                onCloseError={onCloseError}
                onErrorOccur={onErrorOccur}
            />

        </>
    )
}

export default OpenPole