import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import '../style/navbar.css';
import {itemTotal} from './cartHelper';


const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: "#f2a900"};
    }else {
        return {color:"#ffffff"}
    }
};

// const {user: _id} = isAuthenticated()
const Menu = ({ history }) => (
    <nav class=" navbar navbar-expand-lg navbar-light bg-light n1">
   <img className="logo" style={{width:"130px"}} src="https://svgshare.com/i/QXh.svg"/>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className=" navbar-toggler-icon" ></span>
  </button>
    <div className="collapse navbar-collapse" id="navbarNav">
    <div className="ml-auto">
        <ul className=" navbar-nav">
            <li className="nav-item">
               {/* <Link className="nav-item ml-1" to="/"> */}
               
                {/* </Link> */}
            </li>
            {/* <div className="ml-auto"> */}
            <li className="nav-item">
                <Link className="nav-link  font" style={isActive(history, "/")} to="/"> Home </Link>
            </li>
            {/* </div> */}
            {/* <div className="ml-auto"> */}
            <li className="nav-item">
                <Link className="nav-link font" style={isActive(history, "/room")} to="/room"> Room </Link>
            </li>
            {/* </div> */}
            {/* <li className="nav-item">
                <Link className="nav-link font" style={isActive(history, "/cart")} to="/cart"> cart <sup><small className="cart-badge">{itemTotal()}</small></sup> </Link>
            </li> */}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                //  <div className="ml-auto">
                <li className="nav-item">
                    <Link
                        className="nav-link font"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Hello! Admin
                    </Link>
                </li>
                // </div>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                //  <div className="ml-auto">
                            <li className="nav-item l1" id="navbarSupportedContent">
                                <Link
                                    className="nav-link font"
                                    style={isActive(history, "/user/dashboard")}
                                    to="/user/dashboard"
                                >
                                   profile
                                </Link>
                            </li>
                            // </div>    
                        )}

            {!isAuthenticated() && (
                <Fragment>
                   {/* <div className="ml-auto"> */}
                    <li className="nav-item pull-right">
                        <Link
                            className="nav-link font"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>
                    {/* </div> */}
                    

                   
                    <li className="nav-item pull-right">
                        <Link
                            className="nav-link font"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>

                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item pull-right">
                    <span
                        className="nav-link font"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
    </div>
    </nav>
);

export default withRouter(Menu);


































