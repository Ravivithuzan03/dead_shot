import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getServices,getBraintreeClientToken, processPayment,createOrder } from './apiCore';
import Card from './Card';
import {isAuthenticated} from '../auth/index';
import { Link } from 'react-router-dom';
import 'braintree-web';
import DropIn from 'braintree-web-drop-in-react';



const Checkout = ({services}) => {
   const [data, setData] = useState({
            //   loading: false,
              success: false,
              clientToken: null,
              error: '',
              instance: {},
              address: ""
          })

   const userId = isAuthenticated() && isAuthenticated().user._id
   const token = isAuthenticated() && isAuthenticated().token

   const getToken = (userId, token) => {
      getBraintreeClientToken(userId, token).then(data => {
          if(data.error){
             setData({...data, error: data.error})
         }else {
             setData({clientToken: data.clientToken })
            }
         })
      }
      useEffect(() => {
          getToken(userId, token);
      }, []);


        const handleAddress = event =>  {
           setData ({...data,address:event.target.value});
        }




    const getTotal = () => {
        return services.reduce((currentValue,nextValue) => {
           return currentValue + nextValue.count * nextValue.price;
        },0)
    };



    const showCheckout = () => {
       return isAuthenticated() ? (
         <div>{showDropIn()}</div>
       ) : ( 
          <Link to="/signin">
               <button className="btn btn-outline-warning  btn-block">First Signin</button>
          </Link>
       );
    };

    let deliveryAddress = data.address
    
   const buy = () => {
      let nonce;
      let getNonce = data.instance.requestPaymentMethod()
      .then (data => {
         // console.log(data);
         nonce = data.nonce;
         // console.log('send nonce and total to process:',nonce,getTotal(services));
         const paymentData = {
            paymentMethodNonce:nonce,
            amount:getTotal(services)
         }




        processPayment(userId,token,paymentData)
           .then(response => {  
             console.log(response);

             const createOrderData = {
                services:services,
                transaction_id:response.transaction.id,
                amount : response.transaction.amount,
                address: deliveryAddress
             };

             createOrder(userId,token,createOrderData)

              setData({...data,success: response.success});

             })
           .catch(error => console.log(error));

      })
      .catch(error => {
         // console.log ('dropin error:', error)
         setData({...data,error:error.message});
      })
   }







    const showDropIn = () => (
       <div onBlur={() => setData({...data,error:""})}>
          {data.clientToken !==null && services.length > 0 ? (
             <div>
                <div className="gorm-group mb-3">
                   <label className="text-muted">Your Address</label>
                   <textarea onChange={handleAddress} className="form-control"
                   value={data.address}
                   placeholder="Permenant Address..." />

                </div>
                <DropIn options={{
                   authorization:data.clientToken,
                }}
                 onInstance={instance => (data.instance = instance)} />
                 {/* <Link to="/"> */}
                <button onClick={buy} className="btn btn-outline-warning  btn-block md-2 payment_button">Payment</button>
                {/* </Link> */}
             </div>
          ) : null}
       </div>
    );




    const showError = error => (
         <div className="alert alert-danger" style={{display: error ? '':'none'}}>
            {error}
         </div>
    );

    const showSuccess = success => (
      <div className="alert alert-info" style={{display: success ? '':'none'}}>
         Thanks!  Your Payment was successful!
      </div>
 );




return (   
    <div className="">
       <h2 className="total">Total : Rs.{getTotal()}</h2>
       {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
    );
}

export default Checkout;
























































