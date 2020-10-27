import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getServices } from './apiCore';
import Card from './Card';
import Menu from './Menu';
import '../style/room.css'


const Room = () => {
    const [servicesByArrival, setServicesByArrival] = useState([]);
    // eslint-disable-next-line
    const [ setError] = useState(false);

    const loadServicesByArrival = () => {
        getServices('createdAt').then(data => {
            console.log(data);
    // eslint-disable-next-line
            if (data.error) {
                setError(data.error);
            } else {
                setServicesByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadServicesByArrival();
    },[]);

     return (
        <div className=" card_back">
           <Menu/>
             <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                          <div className="jumbotron  shadow" id="room_image">
                   </div> 
               </div>
                   <div class="carousel-item">
                       <div className="jumbotron  shadow" id="room1_image">
                  </div> 
               </div>
                  <div class="carousel-item">
                        <div className="jumbotron  shadow" id="room2_image">
              </div> 
             </div>
             <div class="carousel-item">
                        <div className="jumbotron  shadow" id="room3_image">
              </div> 
             </div>
             <div class="carousel-item">
                        <div className="jumbotron  shadow" id="room4_image">
              </div> 
             </div>
             <div class="carousel-item">
                        <div className="jumbotron  shadow" id="room5_image">
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
                 {servicesByArrival.map((service, i) => (
                    <div key={i} className="col-12">
                        <Card service={service} />
                    </div>
                ))}
         
       <br></br>
       <br></br>
     </div>

);
};

export default Room;