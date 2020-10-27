import React, { useState,useEffect}from 'react';
import Layout from '../core/Layout'
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth'
import {Link,Redirect} from 'react-router-dom';
import { read,update,updateUser} from './apiUser';





const  Profile= ({match}) => {

     const [values,setValues] = useState({  
     firstname:'',
     lastname:'',
     pubgname:'',
     email:'',
     password:'',
     error:false,
     success:false

     });

     const {token} = isAuthenticated()

     const {firstname,lastname,pubgname,email,password,error,success} = values;


     const init = (userId) => {
          // console.log(userId)
          read(userId,token).then (data => {
               if(data.error) {
                    setValues({...values,error:true})
               } else {
                    setValues({...values,firstname:data.firstname,lastname:data.lastname,pubgname:data.pubgname,email:data.email})
               }
          })

     }


     useEffect(() => {
          init(match.params.userId)

     },[]);


     const handleChange = name => e => {
          setValues({...values,error:false,[name]: e.target.value});

     };

     const clickSubmit = e => {

          e.preventDefault()
          update(match.params.userId,token,{firstname,lastname,pubgname, email,password})
          .then(data => {
               if(data.error) {
                    console.log(data.error)
               }else {
                    updateUser(data,() => {
                         setValues({...values,firstname:data.firstname,lastname:data.lastname,pubgname:data.pubgname,email:data.email,success:true})
                    })
               }
          })

     };

     const redirectUser = (success) => {
          if(success) {
               return <Redirect to="/room"/>
          }
     }

     const profileUpdate = (firstname,lastname,pubgname, email,password) => (
       <div className="update_back">
            <img className="profile_logo" src="https://svgshare.com/i/QXh.svg"/>
          <form >
               <div className="form-group">
                    <label className="text-muted">First Name</label>
                    <input type="text" onChange={handleChange('firstname')} className="form-control" value={firstname}/>
               </div>
               <div className="form-group">
                    <label className="text-muted">Last Name</label>
                    <input type="text" onChange={handleChange('lastname')} className="form-control" value={lastname}/>
               </div>
               <div className="form-group">
                    <label className="text-muted">Pubg Name</label>
                    <input type="text" onChange={handleChange('pubgname')} className="form-control" value={pubgname}/>
               </div>
               <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" onChange={handleChange('email')} className="form-control" value={email}/>
               </div>
               <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" onChange={handleChange('password')} className="form-control" value={password}/>
               </div>
               <br/>
               <button onClick={clickSubmit} className="btn btn-warning btn-block pm">Update</button>
          </form>
          <br></br>
          <br></br>
     </div>
     )
         
     return (  
       <div className="profile_back">
           <Menu/>
         <div className="col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-sm-12">
           {profileUpdate(firstname,lastname,pubgname,email,password)}  
           {redirectUser(success)}  
        </div>
      </div>
     );
 };


export default Profile;













