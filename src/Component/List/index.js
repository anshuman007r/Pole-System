import React, { useMemo } from "react";
import './index.css'
import { useHistory } from "react-router-dom";
import { Tooltip, Empty } from '../../Component'
import { useSelector, useDispatch } from "react-redux";
import { DeletePole, ModifyPole } from "../../storage/action";
import { EditTwoTone, DeleteTwoTone, CloseCircleTwoTone, } from "@ant-design/icons";
import moment from 'moment'

const checkForAttemptedPole = (visited_by_user , { userName = ''}) => {
    const checkUserExist = visited_by_user?.find(user => user === userName)
    return checkUserExist ? true : false
}

// const pole_list = [
//     {
//         pole_id : 1,
//         pole_name : 'Pole  for selecting employee of the year',
//         visted_by_user : '20',
//         closing_date : '19/10/2022'
//     },
//     {
//         pole_id : 2,
//         pole_name : 'Pole to plan workation destination',
//         visted_by_user : '40',
//         closing_date : '20/10/2022'
//     },
//     {
//         pole_id : 3,
//         pole_name : 'Pole to select work mode',
//         visted_by_user : '120',
//         closing_date : '18/10/2022'
//     }


// ]

const dateStoreToLocal = (date = '') =>{
    return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY')}

const actionButton = [
    {
        name : 'Edit',
        Component : EditTwoTone,
        color : '#0072E5'
    },
    {
        name : 'Delete',
        Component : DeleteTwoTone,
        color : '#DB3B19'
    },
    {
        name : 'Close',
        Component : CloseCircleTwoTone,
        color : '#C70039'
    }
]

const List = props => {
    const { page, list, onEdit } = props
    const history = useHistory()  
    const { loggedUserReducer : loggedUser, poleReducer : poles } = useSelector( state => state)
    const dispatch = useDispatch()
    
    const role = useMemo(()=> loggedUser?.role || 'user', [loggedUser])
    // const poleList = useMemo(()=>([ ...pole_list, ...pole_list, ...pole_list, ...pole_list]),[])

    const onPoleClick = (id = '') =>{
        const path =  '/pole' 
        history.push(`${path}/${id}`)
    }

    const onActionClick = (type = '', poleId = '') => {
        if(type === 'Edit'){
            onEdit(type, poleId)
        }else if(type === 'Delete'){
            dispatch(DeletePole({ id : poleId}))
        }else{
            const poleIndex = poles?.findIndex(pol => pol?.pole_id === poleId)
            const pole = poles?.[poleIndex] || {}
            // console.log(pole, {...pole, closing_date : moment().format('YYYY/MM/DD')}, poleIndex, poleId)
            if(pole) dispatch(ModifyPole({ updatedPole : {...pole, closing_date : moment().format('YYYY/MM/DD')}, poleIndex}))
        }
    }

    const onResultClick = (id = '') =>{
        const path =  '/close_pole' 
        history.push(`${path}/${id}`)
    }

    return (
        <div className="list_container">
            {
                list?.length ?
                list?.map(({ pole_name, visited_by_user, closing_date, pole_id}, index)=>(
                    <div className = {checkForAttemptedPole(visited_by_user, loggedUser) ? 'list-item-alt' :"list-item"} style={{marginTop : index ? '12px' : 0}} key={`$Pole_${index}`}>
                        <div className="list_item_left_content" onClick={()=> checkForAttemptedPole(visited_by_user, loggedUser) ? null : onPoleClick(pole_id)}
                        >
                            <span style={{display : 'flex'}}>
                                <img alt= "pole_image" src= {process.env.PUBLIC_URL+"images/pole_image.png"} width = "40px" height = "40px"/>
                                <span className="is-capitalized is-size-4 has-text-weight-semibold list-label label-ellipsis">{pole_name || `Pole_${index}` }</span>
                            </span>
                            <div>
                                <span className="is-size-7 has-text-weight-light">Visited by <strong>{visited_by_user?.length || 0} </strong> users</span>
                            </div>
                        </div>
                        <div className="list_item_right_content">

                            <div className="action_button_container" style ={{justifyContent : page === 'Open Poles' ? 'space-between' : 'flex-end', marginTop :  page === 'Open Poles' ?'8px' : '4px'}}>
                                {
                                    role === 'admin' ?
                                    <React.Fragment>
                                        {
                                            page === 'Open Poles' ?
                                            <>
                                                {
                                                    actionButton?.map(({ name , Component, color}, actionIndex)=>(
                                                        <Tooltip key={`action_${actionIndex}`} placement="bottom" title={name}>
                                                            <Component  twoToneColor={color} onClick={()=>onActionClick(name, pole_id)}/>
                                                        </Tooltip>
                                                    ))
                                                }
                                            </> : 
                                            <button className="result-button" onClick={()=>onResultClick(pole_id)}>
                                                <img src={process.env.PUBLIC_URL+'icons/graph_icon.svg'} className="button_icon" width = '20px' height="20px" alt="graph_icon" />
                                                Result
                                            </button>
                                        }
                                    </React.Fragment> 
                                    : null
                                }   
                            </div>
                            <span className="is-size-7 has-text-weight-light">    
                                {
                                    page === 'Open Poles'
                                    ?  'Will expire on ' 
                                    :
                                    'Expired on '
                                } 
                                <strong>{dateStoreToLocal(closing_date) || new Date().toLocaleDateString()} </strong> 
                            </span>
                        </div>

                    </div>
                ))
                : 
                <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    className = 'empty-container' 
                    description= "Oops! List is empty"
                    imageStyle={{ width : '150px', height : '140px'}}
                >
                </Empty>
            }
        </div>
    )
}

List.defaultProps = {
    page : '',
    list : [],
    onEdit : () => {}
}

export default List