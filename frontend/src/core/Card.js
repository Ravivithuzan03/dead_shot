import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import '../style/card.css'
import { addItem,removeItem } from './cartHelper';
// import Checkout from './CheckOut';


const Card = ({
  service,
  showViewServiceButton = true,
  showAddToCartButton = true,
  // cartUpdate = false,
  showRemoveServiceButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(service.count);

 
  const addToCart = () => {
    addItem(service,() => {
       setRedirect(true)
    })
  }

const shouldRedirect = redirect => {
  if(redirect) {
    return <Redirect to="/cart" />
  }
}


  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        // <Link to="/" >
        <button onClick={addToCart}  className="btn btn-outline-warning mt-2 mb-2 card-btn-5 card_button ">
          Join Now
        </button>
        // </Link>
      )
    
    );
      
   
  };


  const showRemoveButton = (showRemoveServiceButton) => {
    return (
      showRemoveServiceButton && (
        <button onClick={() => removeItem(service._id)}  className="btn btn-outline-danger mt-2 mb-2 card-btn-5 card_button">
          Remove
        </button>
      )
    
    );
      
   
  };

  
  return (
    <div className="col-md-6 offset-md-3 col-lg-8 offset-lg-2 col-sm-12 form_back  card">
      <div className="card-header name card-header-1 ">{service.name}</div>
      <div className="card-body ">
      <div className="row">
        {shouldRedirect(redirect)}
        <div className="col-lg-6 col-md-6 col-sm-12">
        <ShowImage className="img " item={service} url="service" />
        </div>
        {/* <div className="room_p"> */}
        <div className="col-lg-6 col-md-6 col-sm-12">
        <p className="card-p lead mt-2 ">Winninng Price : Rs. {service.description} </p>
        <p className="card-p ">Entry Fees  : Rs. {service.price}</p>
        <p className="card-p ">Start Time  :  {service.quantity}</p>
        <p className=" card-p ">Map  :  {service.category && service.category.name}</p>  
        {showAddToCart(showAddToCartButton)}
        {showRemoveButton(showRemoveServiceButton)}
        </div>
        </div>
        </div>
       </div>
  );
};




export default Card;