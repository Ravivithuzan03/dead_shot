import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Layout from './Layout';
import Menu from '../core/Menu';
import Card from './Card';
import Checkout from './CheckOut';
import { getCart,removeItem } from './cartHelper';
import '../style/cart.css';


const Cart = () => {
    const [items,setItems] = useState([])


    useEffect(() => {
        setItems(getCart());
    },[]);
    //items add

    const showItems = items =>{
        return(
        <div>
            {/* <h3>Your Cart Has {`${items.length}`} items</h3> */}
            {/* <hr/> */}
            <h3 className="pay"> Pay Your Payment</h3>
            {items.map((service,i) =>(<Card key={i} service={service} showAddToCartButton={false} showRemoveServiceButton={true} />))}
        </div>
        
        )
    }



    const noItemsMessage = () => (
        <h3>Your room is empty.<br/><Link to="/room">Select the room</Link></h3>
    )



    return (
        <div>
            <div >
               <Menu />
              <div id="carouselExampleControls" class="carousel slide cart" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                          <div className="jumbotron  shadow" id="cart_image">
                   </div> 
               </div>
                   <div class="carousel-item">
                       <div className="jumbotron  shadow" id="cart1_image">
                  </div> 
               </div>
                  <div class="carousel-item">
                        <div className="jumbotron  shadow" id="cart2_image">
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


            <div className="row cart">
                <div className="col-12">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-md-6 offset-md-3 col-lg-8 offset-lg-2 col-sm-12">
                    <Checkout services={items} />
                </div>
            </div>
        </div>
    );
}



export default Cart;