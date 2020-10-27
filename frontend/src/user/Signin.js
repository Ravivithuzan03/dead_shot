import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import Menu from '../core/Menu';
import "../style/signin.css";

const Signin = () => {
    const [values, setValues] = useState({
        email: "ravivithuzan03@gmail.com",
        password: "abc123",
        error: "",
        loading: false,
        redirectToReferrer: false
        
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.err) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="form_back1">
             <h3 className="head">Hello, Player!</h3>
          {/* <img className="logo head"  src="https://svgshare.com/i/QXh.svg"/> */}
        <form>
            <div className="form-group">
                <label className="text-muted" >Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email} 
                />
                <br/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
                <br/>
            </div>
            <button onClick={clickSubmit} className="btn btn-warning btn-block tm">
                Login
            </button>
            <br/>
            <br/>
            <div className="account">Don't Have An Account</div>
            
            <Link to="/signup">
            <button className="btn btn-outline-warning btn-block tm">
                Create Account
            </button>
            </Link>
           
        </form>
        </div>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h6>Loading...</h6>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/room"/>;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;

        }
    };

    return (
        <div className=" signin_back">
        <Menu/>
       <div className="col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-sm-12">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
            </div>
           <br></br>
           <br></br>
        </div>
     
    );
};

export default Signin;




































































