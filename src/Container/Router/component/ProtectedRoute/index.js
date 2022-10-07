import React from 'react'
import { Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
    const { 
        component : Component,
        ...restProps
    } = props

    const isAuthenticated = false

    return (
        <Route
            {...restProps}
            render={props=>(
                isAuthenticated ? <Component { ...props} /> : <Redirect to = '/login'/>
            )}
        />
    )
}

export default ProtectedRoute