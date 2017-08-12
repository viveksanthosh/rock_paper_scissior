import React, { Component } from 'react';
import ioService from '../ioService';

class App extends Component {
  constructor(props) {
    super(props);
    this._confirmConnect = this._confirmConnect.bind(this);
    this._connectionLost = this._connectionLost.bind(this);
    this.state = {
      connected: false
    }
    ioService.connect(this._confirmConnect);
    ioService.disconnect(this._connectionLost);
  }

  _confirmConnect() {
    this.setState({ connected: true })
  }

  _connectionLost() {
    this.setState({ connected: false })
  }
  render() {
    return (
      <div>
        <div className="jumbotron">
          Connection Lost
        </div>
      </div>
    );
  }
}

export default App;
