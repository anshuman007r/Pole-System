import React, { useMemo } from "react";
import './index.css'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const pole_list = [
    {
        pole_id : 1,
        pole_name : 'Pole  for selecting employee of the year',
        visted_by_user : '20',
        closing_date : '19/10/2022'
    },
    {
        pole_id : 2,
        pole_name : 'Pole to plan workation destination',
        visted_by_user : '40',
        closing_date : '20/10/2022'
    },
    {
        pole_id : 3,
        pole_name : 'Pole to select work mode',
        visted_by_user : '120',
        closing_date : '18/10/2022'
    }


]

const List = props => {
    const { page} = props
    const history = useHistory()  
    const { loggedUserReducer : loggedUser } = useSelector( state => state)
    
    const role = useMemo(()=> loggedUser?.role || 'user', [loggedUser])
    const poleList = useMemo(()=>([ ...pole_list, ...pole_list, ...pole_list, ...pole_list]),[])

    const onPoleClick = (id = '') =>{
        const path =  '/pole' 
        history.push(`${path}/${id}`)
    }

    const onResultClick = (id = '') =>{
        const path =  '/close_pole' 
        history.push(`${path}/${id}`)
    }

    return (
        <div className="list_container">
            {
                poleList?.map(({ pole_name, visted_by_user, closing_date, pole_id}, index)=>(
                    <div className = "list-item" style={{marginTop : index ? '12px' : 0}} key={`$Pole_${index}`}>
                        <div className="list_item_left_content" onClick={()=>onPoleClick(pole_id)}
                        >
                            <span style={{display : 'flex'}}>
                                <img alt= "pole_image" src= {process.env.PUBLIC_URL+"images/pole_image.png"} width = "40px" height = "40px"/>
                                <span className="is-capitalized is-size-4 has-text-weight-semibold list-label label-ellipsis">{pole_name || `Pole_${index}` }</span>
                            </span>
                            <div>
                                <span className="is-size-7 has-text-weight-light">Visited by <strong>{visted_by_user || 0} </strong> users</span>
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
                                                <EditTwoTone twoToneColor="#0072E5"/>
                                                <DeleteTwoTone twoToneColor="#DB3B19"/>
                                                <CloseCircleTwoTone twoToneColor="#C70039"/>
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
                                <strong>{closing_date || new Date().toLocaleDateString()} </strong> 
                            </span>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

List.defaultProps = {
    page : ''
}

export default List