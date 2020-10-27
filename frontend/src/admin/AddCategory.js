import React, {useState} from 'react';
import Layout from '../core/Layout';
import Menu from '../core/Menu';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import {createCategory} from './apiAdmin';
import '../style/category.css';



const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    // destructure user and token from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('')
        setName(e.target.value);
        

    };

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        // make request to api to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(data.error)
            }else {
                setError('');
                setSuccess(true);
            }
        });
    };



    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}className="create_category">
            <div className="form-group ">
                <label className="text-muted">Map Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
                
            </div>
            <button className="btn btn-outline-warning btn-block cb">Create Category</button>
        </form>
    );

        const showSuccess = () => {
            if(success) {
            return <h5 className="text-info success_category">{name} is created</h5>
            }
        };

        const showError = () => {
            if(error) {
            return <h5 className="text-danger success_category">Category should be unique</h5>
            }
        };
        const goBack = () => (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-info success_category">Back to Dashboard</Link>
            </div>
        );




    return (
        <div className="category">
            <div >
               <Menu />
              <div id="carouselExampleControls" class="carousel slide cart" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                          <div className="jumbotron  shadow" id="category_image">
                   </div> 
               </div>
                   <div className="carousel-item">
                       <div className="jumbotron  shadow" id="category1_image">
                  </div> 
               </div>
                  <div className="carousel-item">
                        <div className="jumbotron  shadow" id="category2_image">
              </div> 
             </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
           </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
               <span class="carousel-control-next-icon" aria-hidden="true"></span>
               <span class="sr-only">Next</span>
           </a>
      </div>
      </div>
            
            <div className="row ">
            <div className="col-md-6 offset-md-3">
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
                 </div>
            </div>
            <br></br>
    </div>
    
    );

};


export default AddCategory;








