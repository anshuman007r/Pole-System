import React, { useState } from "react";
import { List, Header } from '../../Component'
import { useSelector } from "react-redux";
import AddPoleModal from "../AddPoleModal";

const OpenPole = props =>{
    const [openModal, setOpenModal] = useState(false)
    const { poleReducer : poles } = useSelector(state => state)

    const toggleModal = () =>{
        setOpenModal(prevState => !prevState)
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
            />

        </>
    )
}

export default OpenPole