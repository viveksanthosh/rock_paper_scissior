import React, { Component } from 'react';
import ioService from './ioService';
import AlertScreen from './components/alertScreen';
import LandingPage from './pages/LandingPage'

class App extends Component {
  constructor(props) {
    super(props);
    this._confirmConnect = this._confirmConnect.bind(this);
    this._setActiveUSers = this._setActiveUSers.bind(this);
    this._connectionLost = this._connectionLost.bind(this);
    this.state = {
      connected: false,
      activeUsers: 0
    }
    ioService.connect(this._confirmConnect);
    ioService.userCount(this._setActiveUSers);
    ioService.disconnect(this._connectionLost);
  }

  _confirmConnect() {
    this.setState({ connected: true })
  }

  _setActiveUSers(activeUsers) {
    this.setState({ activeUsers })
  }

  _connectionLost() {
    this.setState({ connected: false })
  }
  render() {
    let ComponentToShow;
    if (!this.state.connected) {
      ComponentToShow = <AlertScreen text="Please Check Your Internet Connection" />
    } else {
      ComponentToShow = <LandingPage userCount={this.state.activeUsers} />
    }
    return (
      <div>
        {ComponentToShow}
      </div>
    );
  }
}

export default App;
