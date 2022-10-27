import React, { useState, useMemo } from "react";
import { List, Header } from '../../Component'
import { useSelector } from "react-redux";
import AddPoleModal from "../AddPoleModal";
import moment from 'moment'
import constants from "../../Constants";
const { 
    OPEN_POLES,
    ADD
} = constants

const isPoleExpire = ({ closing_date = ''}) => {
    if(moment(closing_date)?.isValid){
        const closeDateMillSec = moment(closing_date)?.valueOf()
        const currentDateMillSec = moment()?.valueOf()
        return closeDateMillSec <= currentDateMillSec
    }
    return true
}

const OpenPole = props =>{
    const [openModal, setOpenModal] = useState({ type : ADD, state : '', poleId : ''})
    const [error, setError] = useState('')
    const { poleReducer : poles } = useSelector(state => state)

    const openPoles = useMemo(() => Array.isArray(poles) ? poles?.filter(pole=>!isPoleExpire(pole || {})) : [],[poles])

    const toggleModal = (type = ADD, poleId = '') =>{
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
                page = {OPEN_POLES}
                onOpenModal = {toggleModal}
                { ...props}
            />
            <List
                page = {OPEN_POLES}
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