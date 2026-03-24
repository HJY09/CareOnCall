import React, { Component } from "react";
import { MdDensityMedium, MdAccountCircle, MdLogout, MdHome } from "react-icons/md";
import { Navigate, Link } from "react-router-dom";
import logo from "./CareOnCallLogo.png"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogin: localStorage.getItem('token') ? true : false,
            hidden: true
        };
        this.clickDensity = this.clickDensity.bind(this);
    };

    clickDensity = () => {
        this.setState({
            hidden: !this.state.hidden,
        });
    };

    signOut = () => {
        localStorage.removeItem("token");
        this.setState({
            islogin: false
        });
    };

    render() {
        if (!this.state.islogin) {
            return <Navigate to="/login" />;
        }

        return (
            <header className="top-navigation">
                <div className="logo">
                    <img src={logo} alt="Logo"/>
                </div>
                {/* SECURITY: Use React Router <Link> / <Navigate> instead of
                    directly mutating window.location.pathname, which bypasses
                    the router and can introduce open-redirect risks. */}
                <Link to="/" className="title-link">
                    <h1 className="title">Care On Call</h1>
                </Link>
                <h1 className="density" onClick={this.clickDensity}><MdDensityMedium /></h1>
                <div className="side-navigation" style={this.state.hidden ? { display: 'none' } : {}} >
                    <Link to="/" className="side-item-link">
                        <h3 className="side-item"><MdHome /> Home</h3>
                    </Link>
                    <Link to="/profile" className="side-item-link">
                        <h3 className="side-item"><MdAccountCircle /> Profile</h3>
                    </Link>
                    <h3 className="side-item" onClick={this.signOut}><MdLogout /> Logout</h3>
                </div>
            </header>
        )
    }
}

export default Header;