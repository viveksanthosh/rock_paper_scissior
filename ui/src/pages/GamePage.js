import React from 'react';
import './LandingPage.css';
import { Paper, Rock, Scissor } from '../components/shapes';
import CountDown from '../components/countDown';
import 'bootstrap/dist/css/bootstrap.css';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: ""
        };
        this._onRockButtonSelect = this._onRockButtonSelect.bind(this);
        this._onPaperButtonSelect = this._onPaperButtonSelect.bind(this);
        this._onScissorButtonSelect = this._onScissorButtonSelect.bind(this);
        this._onCountDownEnd = this._onCountDownEnd.bind(this);
    }

    _onRockButtonSelect(event) {
        this.setState({ selection: "Rock" })
    }
    _onPaperButtonSelect(event) {
        this.setState({ selection: "Paper" })
    }
    _onScissorButtonSelect(event) {
        this.setState({ selection: "Scissor" })
    }

    _onCountDownEnd(){
        this.props.onClick(this.state.selection)
    }

    render() {
        return (
            <div>
                <p className="largeWhite" style={{ color: this.props.myColor }}>YOU</p>
                <p className="largeWhite">  VS </p>
                <p className="largeWhite" style={{ color: this.props.opponentColor }}>OPPONENT</p>
                <br /> <br />
                {this.props.showCountDown && <CountDown onTimerEnd={this._onCountDownEnd} />}
                <br /> <br />
                <div style={{ textAlign: "center" }}>
                    <Rock onClick={this._onRockButtonSelect} />
                </div>
                <br /> <br /> <br /> <br />  <br /> <br />
                <div style={{ textAlign: "center" }}>
                    <Paper onClick={this._onPaperButtonSelect} />
                </div>
                <br /> <br /> <br /> <br />  <br /> <br />
                <div style={{ textAlign: "center" }}>
                    <Scissor onClick={this._onScissorButtonSelect} />
                </div>
            </div>
        );



    }

} 