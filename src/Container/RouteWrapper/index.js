import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const RouterWrapper = props => {
    const { children , history={} } = props
    return (
        <Router history={history}>
            {children}
        </Router>
    )
}

export default RouterWrapper