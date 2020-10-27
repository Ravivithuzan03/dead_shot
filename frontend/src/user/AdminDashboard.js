import React from 'react'
import Layout from '../core/Layout'
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import '../style/admindashboard.css';

const AdminDashboard = () => {
// eslint-disable-next-line
const {user: {_id, name, email, role}} = isAuthenticated()

const adminLinks = () => {
  return (
    <div className=" group">
    <h3 className=" start">Admin Access </h3>
    <div className="">
      <div className=" map"><Link className="nav-link" to="/create/category">Create Map</Link></div>
      <div className=" map"><Link className="nav-link" to="/create/service">Create Room</Link></div>
      <div className=" map"><Link className="nav-link" to="/admin/services">Manage Rooms</Link></div>
      <div className=" map"><Link className="nav-link" to="/admin/orders">View Payment Details</Link></div>

    </div>
    </div>
  )
}
  return (
    <div className="admindashboard" >
      <div >
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
      </div>
    <div className='row admin'>
      <div className="col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-sm-10 offset-sm-1 group">
      {adminLinks()}
      </div>


        </div>
<br></br>
<br></br>

    </div>
  )
}

export default AdminDashboard