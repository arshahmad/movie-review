import React, { Component, Fragment } from 'react';
import Navigation from '../Navigation/Navigation';
import Landing from '../Landing/Landing';
import Dashboard from "../Dashboard/Dashboard";
import { Switch, Route} from 'react-router-dom';
import SignIn from "../Auth/SignIn/SignIn";

class Layout extends Component {

    render() {
        return(
            <Fragment>
                <Navigation />
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/sign-in" exact component={SignIn} />
                </Switch>
            </Fragment>
        );
    }
}

export default Layout;
