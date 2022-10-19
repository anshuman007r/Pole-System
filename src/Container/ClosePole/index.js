import React, { useMemo} from "react";
import { List, Header } from "../../Component";
import { useSelector } from "react-redux";
import moment from 'moment'

const isPoleExpire = ({ closing_date = '', ...rest}) => {
    if(moment(closing_date)?.isValid){
        const closeDateMillSec = moment(closing_date, 'YYYY/MM/DD')?.valueOf()
        const currentDateMillSec = moment(moment().format('YYYY/MM/DD'))?.valueOf()
        console.log(closing_date, moment().format('YYYY/MM/DD'), currentDateMillSec, closeDateMillSec, closeDateMillSec <= currentDateMillSec)
        return closeDateMillSec <= currentDateMillSec
    }
    return true
}

const ClosePole = props =>{
    const { poleReducer : poles } = useSelector(state => state)
    const closePoles = useMemo(() => Array.isArray(poles) ? poles?.filter(pole=>isPoleExpire(pole)) : [],[poles])

    return (
        <>
            <Header
                { ...props}
                page = "Close Poles"
            />
            <List
                page = "Close Poles"
                list = {closePoles || []}
            />
        </>
    )
}

export default ClosePole