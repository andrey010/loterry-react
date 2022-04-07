import Web3 from 'web3'

window.ethereum.request({ method: "eth_requestAccounts" });
console.log(window.ethereum.selectedAddress)

const web3 = new Web3(window.ethereum);
window.ethereum.enable();

export default web3
