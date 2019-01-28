import React, { Component } from "react";
import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();


class Accueil extends Component {
    handleLogout=()=>{
        Auth.logout()
        this.props.history.push('/login');
     }
    


    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome admin!</h2>
                </div>
                <p className="App-intro">
                    <button type="button" className="form-submit" onClick={this.handleLogout}>Logout</button>
                </p>
            </div>
        )

    }
}
export default withAuth(Accueil);

