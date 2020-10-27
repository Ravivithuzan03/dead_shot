import React, {useState,useEffect} from 'react';
import Layout from '../core/Layout';
import Menu from '../core/Menu';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import {getServices,deleteService} from "./apiAdmin";
import '../style/manageroom.css';



const ManageServices = () => {
    const [services,setServices] = useState ([])

    const {user,token} = isAuthenticated()


    const loadServices = () => {
        getServices().then(data => {
            if (data.error) {
                console.log(data.error)
            }else {
                setServices(data)
            }
        })
    }

    const destroy = serviceId => {
        deleteService(serviceId,user._id,token)
        .then(data => {
            if(data.error) {
                console.log (data.error)
            } else {
                loadServices()
            }
        })
    }

    useEffect(() => {
        loadServices()

    },[])
    
    return (
        <div className="manage_room">
            <Menu />
            <div className="row">
                <div className="col-12">
                 <h2 className="text-center manageroom_room">Total {services.length} Rooms </h2>
                 <hr/>
                    <ul className="list-group">
                        {services.map((s,i) => (  
                            <li key={i} className="list-group d-flex justify-content-between align-items-center">
                            <h5 className="manageroom_name"> {s.name}</h5>
                            <Link to={`/admin/service/update/${s._id}`}>
                                <button className="btn btn-outline-warning manage_button">
                                  Update
                                </button>
                            </Link>
                            <button onClick={() => destroy(s._id)} className="btn btn-outline-danger manage_button">
                                  Delete
                                </button>

                            </li>

                        ))}
                    </ul>

                </div>
            </div>
            <br></br>
            <br></br>
           
        </div>
   
   );
   
}

export default ManageServices;