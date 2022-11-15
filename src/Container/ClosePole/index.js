import React, { useMemo } from "react";
import { List, Header } from "../../Component";
import { useSelector } from "react-redux";
import { isPoleExpire } from "../../helper";
import constants from "../../Constants";
const { CLOSE_POLES } = constants


const ClosePole = props =>{
    const { poleReducer : poles } = useSelector(state => state)
    const closePoles = useMemo(() => Array.isArray(poles) ? poles?.filter(pole=>isPoleExpire(pole || {})) : [],[poles])
    
    return (
        <>
            <Header
                { ...props}
                page = {CLOSE_POLES}
            />
            <List
                page = {CLOSE_POLES}
                list = {closePoles || []}
            />
        </>
    )
}

export default ClosePole