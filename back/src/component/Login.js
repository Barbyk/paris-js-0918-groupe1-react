import React, { Component } from 'react';
import './Login.css';
import AuthService from './AuthService';

const Auth = new AuthService();
class Login extends Component {
    constructor(){
        super();
    }
    

    componentWillMount(){
        if(Auth.loggedIn())
            this.props.history.replace('/login');
    }
    
    handleFormSubmit=(e)=>{
        e.preventDefault();
      
        Auth.login((this.state.username||""),(this.state.password||""))
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form>
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"

                            onClick={this.handleFormSubmit}
                        />
                    </form>
                </div>
            </div>
        );
    }

    handleChange=(e)=>{
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
}

export default Login;
