import { BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from '../LoginPage'
import MainPage from "../MainPage";
import RegisterPage from "../RegisterPage"; 
import { ProtectedRoute, PrivateRoute } from "./component";

const RouteWrapper = props => {
    return (
        <Router>
            <Switch>
                <ProtectedRoute component = {MainPage} path= '/' exact />
                <PrivateRoute component = {LoginPage} path= '/login' />
                <PrivateRoute component = {RegisterPage} path= '/register' />
            </Switch>
        </Router>
    )
}

export default RouteWrapper