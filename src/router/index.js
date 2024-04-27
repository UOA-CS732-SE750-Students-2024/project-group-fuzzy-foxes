import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import App from "../pages/App"

export default class SignUp extends Component{
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