import "./App.css";
import React from "react";
import loterry from "./loterry";
import web3 from "./web3";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      manager: '',
      message: '',
      players: [],
      balance: '',
      value: ''
    }
  }

  componentDidMount () {
    (async() => {
      try {
        const manager = await loterry.methods.manager().call()
        const players = await loterry.methods.getPlayers().call()
        const balance = await web3.eth.getBalance(loterry.options.address)
        this.setState({manager, players, balance})
      } catch(e) {
        console.log(e)
      }      
    })()

  }
  onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts()
    this.setState({message: 'Waiting on transcation success ...'})
    await loterry.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })
    this.setState({message: 'You have been entered'})
  }

  pickWinner = async () => {
    const accounts = await web3.eth.getAccounts()
    this.setState({message: 'Waiting on transcation success ...'})
    await loterry.methods.pickWinner().send({
      from: accounts[0]
    })
    this.setState({message: 'Winner picked'})
  }

  render() {
    
    return (
      <div>
        <h2>Loterry Contract</h2>
        <p>This contract managed by {this.state.manager}</p>
        <p>{`People entered: ${this.state.players.length}`}</p>
        <p>{`Prize is ${web3.utils.fromWei(this.state.balance, 'ether')}`}</p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try luck?</h4>
          <div>
            <label>Amount of ether to enter </label>
            <input
              type='number'
              value={this.state.value}
              onChange={e => this.setState({value: e.target.value})}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr/>

        <h4>ready to pick winner ?</h4>
        <button onClick={this.pickWinner}>Pick winner</button>
        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
