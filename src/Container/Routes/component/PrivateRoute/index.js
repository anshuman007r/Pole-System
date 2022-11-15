import React, { useMemo} from 'react'
import { Route, Redirect} from 'react-router-dom'
import { useSelector} from 'react-redux'

const PrivateRoute = props => {
    const { 
        component : Component,
        ...restProps
    } = props

    const { loggedUserReducer : loggedUser } = useSelector( state => state)
    const isAuthenticated = useMemo(()=>loggedUser?.userName, [loggedUser])

    return (
        <Route
            {...restProps}
            render={props=>(
                !isAuthenticated ? <Component { ...props} /> : <Redirect to = '/'/>
            )}
        />
    )
}

export default PrivateRoute