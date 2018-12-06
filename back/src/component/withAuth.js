import React, { Component } from 'react';
import AuthService from './AuthService';

// Export a function withAuth which takes a AuthComponent as a parameter

// Instantiate AuthService

// Return a class AuthWrapped in which auth is handled

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }
        // Add componentWillMount hook which checks the auth

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    this.setState({
                        user: "admin"
                    })
                }
                catch (err) {
                    Auth.logout()
                    this.props.history.replace('/login')
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent {...this.props}  history={this.props.history} user={this.state.user} />
                )
            }
            else {
                return null
            }
        }
    }
}
        

   
    



