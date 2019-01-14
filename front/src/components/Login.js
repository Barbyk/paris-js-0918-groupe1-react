import React, { Component } from 'react';
import './Login.css';
import AuthService from './AuthService';

const Auth = new AuthService();
class Login extends Component {
    constructor(){
        super();
        this.state={
            username:undefined,
            password:undefined
        }
    }
    

    componentWillMount(){
        if(Auth.loggedIn())
            this.props.history.replace('/login');
    }
    
    handleFormSubmit=(e)=>{
        e.preventDefault();
        if (!this.state.username || !this.state.password )
            alert('Veuillez remplir les champs !')
        else {
        if (Auth.login((this.state.username||""),(this.state.password||"")))
            
               this.props.history.replace('/');
            else alert ("Identifiants incorrects !")
        
        }
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form>
                        <input
                            className="form-item"
                            placeholder="Nom d'utilisateur..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            className="form-item"
                            placeholder="Mot de passe..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            className="form-submit"
                            value="VALIDER"
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
