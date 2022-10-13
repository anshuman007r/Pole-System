import React from "react";
import { List, Header } from '../../Component'

const OpenPole = props =>{
    return(
        <>
            <Header
                page = "Open Poles"
                { ...props}
            />
            <List
                page = "Open Poles"
            />
        </>
    )
}

export default OpenPole