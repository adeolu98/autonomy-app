import './tailwind.css';
import React, { Component, useState } from 'react';
import Web3 from 'web3';
import img1 from "./botsuccess-computer.jpg";
import img2 from "./botsuccess-phone.jpg";




function Success({ account, request, setRequest }) {

    return (
        <div className = "bg-black">
            <div class="hidden sm:block mt-36">
                <div class="flex justify-center">
                    <img class="w-1/5 h-1/5" src={img1} alt="" srcset=""></img>
                </div>
            </div>
            <div class="sm:hidden px-12 pt-36">
                <img src={img2} alt="" srcset="" />
            </div>

            <div class="flex justify-center pt-6">
                <div class="text-white  text-3xl">
                    REQUEST SENT!
                </div>
            </div>
            <div class="flex justify-center pt-2">
                <div class="text-white text-sm">
                    Autonomy bots have received your request and
                </div>
            </div>
            <div class="flex justify-center">
                <div class="text-white text-sm ">
                    will execute it when all instances are true
                </div>
            </div>
            <div class="flex justify-center">
                <button class=" border-blue-500 mb-28 border-2 bg-blue-500 text-white px-4 rounded-lg h-10 mt-4 hover:bg-blue-400" onClick={(event) => {
                    event.preventDefault()
                    setRequest('true')
                }}>
                    make new request
                </button>
            </div>

        </div>
    );

}

export default Success;
