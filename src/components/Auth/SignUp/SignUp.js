import React, { Component } from 'react';
import classes from './SignUp.css';
import { observer, inject } from 'mobx-react';
import Spinner from "../../UI/Spinner/Spinner";
import GoogleBtn from "../GoogleLogin/GoogleLogin";

@inject('AuthStore')
@observer
class SignUp extends Component {

    render() {

        let signup = null;

        if (this.props.AuthStore.isloading === false) {
            signup = <Spinner />;
        } else {
            signup = (
                <div>
                    <form onSubmit={(e) => this.props.AuthStore.signUp(e, this.props)} className={classes.SignUp}>
                        <input type="text" placeholder="Name" name="name"/>
                        <input type="email" placeholder="Email" name="email"/>
                        <input type="password" placeholder="Password" name="password"/>
                        <button>submit</button>
                    </form>
                    <GoogleBtn />
                </div>
            );
        }

        return signup;
    }
}

export default SignUp;
