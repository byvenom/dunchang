import React, { useState } from "react";
import {Link} from "react-router-dom";
import './start.css';

function StartPage(){
    return (
        <div className="bg">
            <video muted autoPlay loop>
                <source src="//bit.ly/3kYMF9A" type="video/mp4" />
            </video>
            <div className="text">
            <p className="p1" >Hello Yeottube</p>
            <Link to= "/LandingPage"><p className="p2" ><font>Go Home</font></p>
            </Link>
          </div>
        </div>
    );
}

export default StartPage;