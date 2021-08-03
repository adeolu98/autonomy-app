import './tailwind.css';
import React, { Component, useState } from 'react';
import Web3 from 'web3';
import Request from './request.js';
import Success from "./sucessPage";
import Sending from "./sending.js"

function Main({ account, networkId, autonomyregistrycontract }) {
    const [request, setRequest] = useState('true')

    let content
    if (request == "true") {
        content = <Request
            account={account}
            request={request}
            setRequest={setRequest}
            networkId={networkId}
            autonomyregistrycontract={autonomyregistrycontract}
        />
    } else if (request == 'false') {
        content = <Success
            account={account}
            request={request}
            setRequest={setRequest}
        />
    } else {
        content = <Sending
        />
    }


    return (
        <div>
            {content}
        </div>
    );

}
export default Main;
