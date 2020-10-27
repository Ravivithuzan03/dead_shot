import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Layout from '../core/Layout';
import {signup} from '../auth/index';
import Menu from '../core/Menu';
import "../style/signup.css";
import '../core/Layout'

const Signup = () => {
    const [values, setValues] = useState({
        firstname:'',
        lastname:'',
        pubgname:'',
        email:'',
        password:'',
        error:'',
        success: false
    });

    const {firstname,lastname,pubgname, email, password, success, error} = values
    
    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };





const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false });
    signup({firstname,lastname,pubgname, email, password})
    .then(data => {
        if(data.error) {
            setValues({...values, error: data.error, success: false})
        }else {
            setValues({
                ...values,
                firstname:'',
                lastname:'',
                pubgname:'',
                email:'',
                password:'',
                error:'',
                success: true
            })
        }
    })
};


    const signUpForm = () => (
        <div className="form_back">
                 {/* <img className="logo" style={{width:"200px"}} src="https://svgshare.com/i/QXh.svg"/> */}
                 {/* <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-sm-12"> */}
                <h3 className="head">Hello, Player!</h3>
                {/* </div> */}
            
        <form> 
            <div className="form-group ">
                <label className="text-muted">First Name</label>
                <input onChange={handleChange('firstname')} type="text" className="form-control" value={firstname}/>
                <br/>
            </div>
            <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input onChange={handleChange('lastname')} type="text" className="form-control" value={lastname}/>
                <br/>
            </div>
            <div className="form-group">
                <label className="text-muted">Pubg Name</label>
                <input onChange={handleChange('pubgname')} type="text" className="form-control" value={pubgname}/>
                <br/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email Address</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
                <br/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
                <br/>
            </div> 
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                <label className="form-check-label" for="defaultCheck1">
                I agree to the <strong className="color">Terms of service</strong>  and I have read and <br/>understood the <strong className="color">Privacy Policy</strong>. (Required)
                </label>
                <br/>
                <br/>
            </div>
            <button onClick={clickSubmit} className="btn btn-warning btn-block tm">
                Create Account
            </button>
        </form>
        </div>
        
    );


const showError = () => (
    
     <div className="alert alert-danger" style={{display: error ? '' : 'none'}} >
            {error}
        </div>
    
);
const showSuccess = () => (
    <div className="alert alert-info" style={{display: success ? '' : 'none'}} >
        New account is created. Please <Link to="/signin">Signin</Link>
    </div>
);





     return(
        <div className=" signup_back">
           <Menu/>
          <div className="col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-sm-12">
             {showSuccess()}
             {showError()}
             {signUpForm()}
            
          </div>
          <br></br>
        <br></br>
       </div>
      
     );
};

export default Signup;