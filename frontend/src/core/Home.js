
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getServices } from './apiCore';
import '../style/home.css';
import '../style/footer.css'
import Menu from './Menu';




const Home = () => {
     return (
    <div className=" home_back">
         <Menu/>
         <div className="jumbotron  shadow" id="cf6_image">
            <h1 className=" word">Let's Get Ready</h1>
            <h1 className="word1">With Loaded gun</h1>
            {/* <button type="button" className="btn btn-warning button">Warning</button> */}
             </div>  
        <br></br>
        <br></br>
       </div>
   
     
       
         
     
     )
}

export default Home;