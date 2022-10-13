import { BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from '../LoginPage'
import MainPage from "../MainPage";
import RegisterPage from "../RegisterPage"; 
import OpenPole from "../OpenPole";
import ClosePole from "../ClosePole";
import PoleDetails from "../PoleDetails";
import PoleResult from "../PoleResult";
import { ProtectedRoute, PrivateRoute } from "./component";

const RouteWrapper = props => {
    return (
        <Router>
            <Switch>
                <ProtectedRoute component = {MainPage} path= '/' exact />
                <ProtectedRoute component = {OpenPole} path = '/pole' exact />
                <ProtectedRoute component = {PoleDetails} path = '/pole/:poleId' />
                <ProtectedRoute component = {ClosePole} path = '/close_pole' exact />
                <ProtectedRoute component = {PoleResult} path = '/close_pole/:poleId' />
                <PrivateRoute component = {LoginPage} path= '/login' />
                <PrivateRoute component = {RegisterPage} path= '/register' />
            </Switch>
        </Router>
    )
}

export default RouteWrapper