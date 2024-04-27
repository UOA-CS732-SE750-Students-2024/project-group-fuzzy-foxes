import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import App from "../pages/App"
import SignUpPage from '../pages/SignUp/SignUpPage'
export default class SignUpPage extends Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" Component={App}></Route>
                    <Route path="/sign" Component={SignUpPage}></Route>
                </Switch>
            </Router>
        )
    }
}