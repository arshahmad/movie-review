import { observable,action } from "mobx";
import axios from '../axios-instance';

class AuthStore {
    @observable isloading = null;
    @observable error = null;

    @action signUp = (e, props) => {
        this.isloading = false;
        e.preventDefault();

        const payload = {
            "name" : e.target.name.value,
            "email" : e.target.email.value,
            "password" : e.target.password.value
        };

        axios.post('/register', payload)
            .then(res => {
                this.isloading = true;
                props.history.push('/');
            }).catch(res => {
            console.log(res.data);
        });
    };

    @action signIn = (payload, props) => {
        this.isloading = false;

        axios.post('/login', payload)
            .then(res => {
                localStorage.setItem('token', res.data.token);

                this.isloading = true;

                props.history.push('/dashboard');

            }).catch(res => {
                this.isloading = true;
                this.error = res.response.data.message;
        });
    };

    @action signOut = (props) => {
        this.isloading = false;

        axios.post('/logout', {}, {
            'headers' : {
                'Authorization' : 'Bearer' + localStorage.getItem('token')
            }
        })
            .then(res => {

                this.isloading = true;

                props.history.push('/');

            }).catch(res => {
                console.log(res.data);
        });

        localStorage.removeItem('token');
    };
}

const store = new AuthStore();
export default store;
