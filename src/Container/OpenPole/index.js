import React, { useState } from "react";
import { List, Header } from '../../Component'
import AddPoleModal from "../AddPoleModal";

const OpenPole = props =>{
    const [openModal, setOpenModal] = useState(false)

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
            />
            <AddPoleModal
                open={openModal}
                onClose={toggleModal}
            />

        </>
    )
}

export default OpenPole