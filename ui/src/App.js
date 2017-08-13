import React, { Component } from 'react';
import ioService from './ioService';
import AlertScreen from './components/alertScreen';
import LandingPage from './pages/LandingPage'
import LoadingPage from './pages/LoadingPage'
import GamePage from './pages/GamePage'

class App extends Component {
  constructor(props) {
    super(props);
    this._confirmConnect = this._confirmConnect.bind(this);
    this._opponentFound = this._opponentFound.bind(this);
    this._lookingForOpponent = this._lookingForOpponent.bind(this);
    this._setActiveUSers = this._setActiveUSers.bind(this);
    this._connectionLost = this._connectionLost.bind(this);
    this.state = {
      connected: false,
      activeUsers: 0,
      lookingForOpponent: false,
      opponentAvaliable: false
    }
    ioService.connect(this._confirmConnect);
    ioService.userCount(this._setActiveUSers);
    ioService.opponentFound(this._opponentFound);
    ioService.disconnect(this._connectionLost);
  }

  _confirmConnect() {
    this.setState({ connected: true })
  }

  _setActiveUSers(activeUsers) {
    this.setState({ activeUsers })
  }

  _opponentFound() {
    this.setState({ opponentAvaliable: true })
  }

  _lookingForOpponent() {
    ioService.lookForOpponent();
    this.setState({ lookingForOpponent: true })
  }

  _connectionLost() {
    this.setState({ connected: false })
  }
  render() {
    let ComponentToShow;
    if (!this.state.connected) {
      ComponentToShow = <AlertScreen text="Please Check Your Internet Connection" />
    } else if (!this.state.lookingForOpponent) {
      ComponentToShow = <LandingPage userCount={this.state.activeUsers} lookingForOpponent={this._lookingForOpponent} />
    } else if (this.state.lookingForOpponent && !this.state.opponentAvaliable) {
      ComponentToShow = <LoadingPage userCount={this.state.activeUsers} />
    } else if (this.state.lookingForOpponent && this.state.opponentAvaliable) {
      ComponentToShow = <GamePage userCount={this.state.activeUsers} />
    }
    return (
      <div>
       <GamePage/>
      </div>
    );
  }
}

export default App;
