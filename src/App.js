import "./App.css";
import React from "react";
import loterry from "./loterry";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { manager: ''}
  }

  componentDidMount () {
    (async() => {
      try {
        const manager = await loterry.methods.manager().call()
        this.setState({manager})
      } catch(e) {
        console.log(e)
      }      
    })()

  }

  render() {
    
    return (
      <div>
        <h2>Loterry Contract</h2>
        <p>This contract managed by {this.state.manager}</p>
      </div>
    );
  }
}
export default App;
