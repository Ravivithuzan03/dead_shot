import React from 'react'
import Layout from '../core/Layout'
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom';
import '../style/profile.css';



const Dashboard = () => {
const {user: {_id,firstname,lastname,pubgname, email, role}} = isAuthenticated()
// const userLinks = () => {
//   return (
//     <div>
//        <button className="btn btn-outline-primary mt-2 mb-2 mr-2"><Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link></button>
//     </div>
    
//   )
// }


const userInfo = () => {
  return ( 
  <div className="card mb-4 dashboard">
      <h3 className="card-header info">
        User Details
      </h3>
      <ul className="list-group ">
        <li className="list-group-item user">{email}</li>
        <li className="list-group-item user">{role===1? 'Admin':'Registered User'}</li>
        <li className="list-group-item user"><button className="btn btn-outline-warning btn-block"><Link className="nav-link update" to={`/profile/${_id}`}>Update Profile</Link></button></li>
      </ul>
  </div>
  )
}




  return (
    <div className="userdashboard" >
      <Menu />
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                          <div className="jumbotron  shadow" id="profile_image">
                   </div> 
               </div>
                   <div class="carousel-item">
                       <div className="jumbotron  shadow" id="profile1_image">
                  </div> 
               </div>
                  <div class="carousel-item">
                        <div className="jumbotron  shadow" id="profile2_image">
              </div> 
             </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
           </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
               <span class="carousel-control-next-icon" aria-hidden="true"></span>
               <span class="sr-only">Next</span>
           </a>
      </div>
    <div className='row '>
      <div className="col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
      {userInfo()}
      {/* {userLinks()} */}
      </div>
        </div>
    </div>
  )
}

export default Dashboard;




