import React, { useMemo } from "react";
import { List, Header } from '../../Component'
import { useSelector } from "react-redux";

const OpenPole = props =>{

    const { loggedUserReducer : loggedUser } = useSelector( state => state)
    
    const role = useMemo(()=> loggedUser?.role || 'user', [loggedUser])

    return(
        <>
            <Header
                page = "Open Poles"
                { ...props}
            />
            <List
                page = "Open Poles"
                role = {role}
            />
        </>
    )
}

export default OpenPole