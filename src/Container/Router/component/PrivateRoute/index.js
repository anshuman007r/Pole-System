import React from 'react'
import { Route, Redirect} from 'react-router-dom'

const PrivateRoute = props => {
    const { 
        component : Component,
        ...restProps
    } = props

    const isAuthenticated = false

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