import './tailwind.css';
import React, { Component, useState } from 'react';
import Web3 from 'web3';
import Main from "./Main.js"
import Registry from "./AutonomyRegistry.json";



function App() {
  const [account, setaccount] = useState("connect wallet")
  const [ethbalance, setethbalance] = useState()
  const [networkId, setnetworkId] = useState([])
  const [autonomyregistrycontract, setautonomyregistrycontract] = useState()

  async function loadBlockchainData() {
    const web3 = window.web3
    //load AUTONOMY registry contract from ABI  
    const autonomyRegistryAdd = "0xB82Ae7779aB1742734fCE32A4b7fDBCf020F2667"
    const autonomyRegistryContract = new web3.eth.Contract(Registry.abi, autonomyRegistryAdd)
    setautonomyregistrycontract(autonomyRegistryContract)
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      const web3 = window.web3

      const accounts = await web3.eth.getAccounts()
      setaccount(accounts[0])

      const ethBalance = await web3.eth.getBalance(accounts[0])
      setethbalance(ethBalance)

      const networkID = await web3.eth.net.getId()
      setnetworkId(networkID)
      if (networkID !== 3) {
        window.alert("please switch to ropsten and reload site")
      }

    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      const web3 = window.web3

      const accounts = await web3.eth.getAccounts()
      setaccount(accounts[0])

      const ethBalance = await web3.eth.getBalance(accounts[0])
      setethbalance(ethBalance)

      const networkID = await web3.eth.net.getId()
      setnetworkId(networkID)
      if (networkID !== 3) {
        window.alert("please switch to ropsten and reload site")
      }

    }
    else {
      window.alert('Non-Ethereum browser detected. Please install metamask chrome extension and refresh page')
    }
  }


  return (
    <div className="bg-black">
      <div>
        <div class="flex justify-end pr-4 pb-2">
          <button class="border-blue-500 rounded-lg border sm:text-lg sm:font-bold px-2 h-10 mt-4 md:mt-4 text-black bg-white hover:bg-blue-200" onClick={(event) => {
            event.preventDefault()
            loadWeb3()
            loadBlockchainData()
            window.ethereum.on('accountsChanged', function () {
              // Time to reload your interface with accounts[0]! 
              loadWeb3()
            })
          }}> {account.slice(0, 14)}</button>
        </div>
        <div class="flex justify-start pl-4 -mt-10">
          <div class="text-white sm:font-bold">
            AUTONOMY DEMO
          </div>
        </div>

        <div class="border-white border w-full mt-6 " style={{ backgroundColor: "whitesmoke" }}></div>
      </div>
      <div className='bg-black'>
        <Main account={account}
          autonomyregistrycontract={autonomyregistrycontract}
          networkId={networkId}
        />
      </div>

    </div>

  );


}

export default App;
