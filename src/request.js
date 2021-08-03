import './tailwind.css';
import React, { Component, useState } from 'react';
import Web3 from 'web3';
import TradeExecutor from './TradeExecutor.json';


function Request({ account, request, networkId, setRequest, autonomyregistrycontract }) {

    const [EthForCall, setEthForCall] = useState("")

    async function sendTx() {
        const web3 = window.web3

        const TradeExecutorAdd = "0x7B25baE960Da29ef5A1674c2CB0fe48731D9ddC7";
        const TradeExecutorContract = new web3.eth.Contract(TradeExecutor.abi, TradeExecutorAdd)
        const referrerAdd = "0x0000000000000000000000000000000000000000";
        const calldata = TradeExecutorContract.methods.execute().encodeABI()
        const ethForCall = window.web3.utils.toWei(EthForCall, 'Ether');
        const verifysender = false;
        const paywithAUTO = false;

        // make web3 transaction request 
        if (networkId === 3) {
            autonomyregistrycontract.methods.newReq(TradeExecutorAdd, referrerAdd, calldata, ethForCall, verifysender, paywithAUTO).send({ from: account, value: ethForCall }).on('transactionHash', (hash) => {
                setRequest("sending")
            }).once('confirmation', function (confNumber, receipt) { setRequest('false') }).on('error', function (error, receipt) {
                window.alert('transaction on blockchain failed, try again');
                setRequest('true')
            })

        } else {
            window.alert('autonomy contract not live on this blockchain')
        }
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className='absolute text-white text-lg mt-12'>
                    Request for future trade execution
                </div>
            </div>
            <div class="flex justify-center px-6 bg-black">
                <div class=" mt-24 p-4 sm:p-8 md:mt-20  lg:mt-32 border-blue-500 border-2 rounded-lg  w-96 h-96 md:h-customLength bg-white">

                    <div>
                        <label for=""> eth for call</label>
                        <input min='0.01' class="form-control" value={EthForCall} placeholder="0.01" class="border-blue-500 h-12 border-2 opacity-75 rounded-lg px-4 w-full mt-2 justify-center "
                            type="number" name="" id=""
                            onChange={(event) => {
                                setEthForCall(event.target.value)
                            }}

                        />
                    </div>
                    <div class="mt-4 sm:mt-8">
                        <label for=""> pay with auto</label>
                        <input class="border-blue-500 border-2 h-12 opacity-75 rounded-lg w-full mt-2 justify-center "
                            type="checkbox" name="" id="" disabled />

                    </div>
                    <div class="mt-4 sm:mt-8">
                        <label for=""> pay with eth</label>
                        <input class="border-blue-500 border-2 h-12 opacity-75 rounded-lg w-full mt-2 justify-center "
                            type="checkbox" name="" id="" />

                    </div>

                    <div class="flex justify-center">
                        <button class="border-blue-500 border-2 h-12 w-3/4 mt-4 sm:mt-12 text-white rounded-lg bg-black" onClick={(event) => {
                            event.preventDefault()
                            if (account !== "connect wallet") {
                                if (EthForCall >= 0.01) {
                                    sendTx()
                                } else {
                                    window.alert('eth for call value lower than 0.01 eth')
                                }

                            } else {
                                window.alert('please connect wallet')
                            }

                        }}>
                            SEND REQUEST
                        </button>
                    </div>

                </div>
            </div>
            <div className="pt-56 bg-black h-3/5">
            </div>
        </div>
    );

}

export default Request;
