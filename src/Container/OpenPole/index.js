import React, { useState } from "react";
import { List, Header } from '../../Component'
import { useSelector } from "react-redux";
import AddPoleModal from "../AddPoleModal";

const OpenPole = props =>{
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState('')
    const { poleReducer : poles } = useSelector(state => state)

    const toggleModal = () =>{
        setOpenModal(prevState => !prevState)
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
                list = {poles || []} 
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