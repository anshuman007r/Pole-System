import React from "react";
import { List, Header } from "../../Component";

const ClosePole = props =>{
    return (
        <>
            <Header
                page = "Close Poles"
                { ...props}
            />
            <List
                page = "Close Poles"
            />
        </>
    )
}

export default ClosePole