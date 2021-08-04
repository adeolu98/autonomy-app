import './tailwind.css';
import React, { Component, useState } from 'react';
import Loader from './loader'


function Sending() {


    return (
        <div className="bg-black">
           
                <div className="text-4xl mt-56 sm:mt-80 h-customLength" >
                <Loader></Loader>
                </div>
        
            
        </div>
    );

}
export default Sending;
