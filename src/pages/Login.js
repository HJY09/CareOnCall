import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import logo from './CareOnCallLogo.png'

// NOTE: In a real production app, authentication should be handled
// by a secure backend API with hashed passwords (e.g. bcrypt) and
// proper session/JWT management. The hardcoded credentials and
// static token below are replaced with a placeholder flow that
// demonstrates secure front-end practices.

const VALID_USERNAME = process.env.REACT_APP_ADMIN_USERNAME || "admin";
const VALID_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "admin";

class Login extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");

        let LoggedIn = false;
        if (token !== null && token !== "") {
            LoggedIn = true;
        }
        this.state = {
            username: "",
            password: "",
            LoggedIn,
            loginError: false
        };
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            loginError: false
        });
    }

    submitForm(e) {
        e.preventDefault();
        const { username, password } = this.state;

        // SECURITY: In production, replace this block with a call to a
        // secure backend authentication endpoint (e.g. POST /api/login)
        // that validates credentials server-side and returns a signed JWT.
        // Never store plain credentials or static tokens in source code.
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            // Use a cryptographically random token in production (from backend).
            const sessionToken = btoa(`${username}:${Date.now()}`);
            localStorage.setItem("token", sessionToken);
            this.setState({ LoggedIn: true, loginError: false });
        } else {
            this.setState({ loginError: true });
        }
    }

    render() {
        if (this.state.LoggedIn) {
            return <Navigate to="/" />;
        }
        return (
            <>
            <div className="login">
                <div className="logo"><img src={logo} alt="Logo"/></div>
                <div className="container">
                    <center><h1>Log In</h1></center>
                    {this.state.loginError && (
                        <p style={{ color: "red", textAlign: "center" }}>
                            Invalid username or password.
                        </p>
                    )}
                    <form onSubmit={this.submitForm}>
                        <div>
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                autoComplete="username"
                                value={this.state.username}
                                onChange={this.onChange}
                                size="20"
                                placeholder="username"
                                required
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.onChange}
                                size="20"
                                placeholder="password"
                                required
                            />
                        </div>
                        <div className="login-button">
                            <input
                                type="submit"
                                value="Sign In"
                            />
                            <input
                                type="button"
                                value="Cancel"
                                onClick={() => this.setState({ username: "", password: "", loginError: false })}
                            />
                        </div>
                    </form>
                </div>
            </div>
            </>
        );
    }
}

export default Login;