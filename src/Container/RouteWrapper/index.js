import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const RouterWrapper = props => {
    const { children } = props
    return (
        <Router>
            {children}
        </Router>
    )
}

export default RouterWrapper