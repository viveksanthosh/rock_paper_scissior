import React from 'react';
import './LandingPage.css';
import { Paper, Rock, Scissor } from '../components/shapes';
import CountDown from '../components/countDown';
import 'bootstrap/dist/css/bootstrap.css';

export default class extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            selection: "NONE",
            colors: {
                Rock: "",
                Paper: "",
                Scissor: ""
            }
        };

        this.state.colors[this.props.myMove] = this.props.myColor;
        this.state.colors[this.props.opponentsMove] = this.props.opponentColor;
        this._resetColors = this._resetColors.bind(this);
        this._onRockButtonSelect = this._onRockButtonSelect.bind(this);
        this._onPaperButtonSelect = this._onPaperButtonSelect.bind(this);
        this._onScissorButtonSelect = this._onScissorButtonSelect.bind(this);
        this._onCountDownEnd = this._onCountDownEnd.bind(this);
    }

      _onRockButtonSelect(event) {
        this.setState({ selection: "Rock" })
        this._resetColors("Rock")
    }
    _onPaperButtonSelect(event) {
        this.setState({ selection: "Paper" })
        this._resetColors("Paper")
    }
    _onScissorButtonSelect(event) {
        this.setState({ selection: "Scissor" })
        this._resetColors("Scissor")
    }

    _resetColors(element) {
        let colors = {
            Rock: "",
            Paper: "",
            Scissor: ""
        };
        colors[element] = this.props.myColor
        this.setState({ colors })
    }

    _onCountDownEnd() {
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

                {this.props.result  && <p className="largeWhite" style={{ color: "red" }}>
                    {`You Have ${this.props.result}`}</p>}
                }
                <br /> <br />
                <div style={{ textAlign: "center" }}>
                    <Rock color={this.state.colors.Rock} clickable={this.props.showCountDown} onClick={this._onRockButtonSelect} />
                </div>
                <br /> <br /> <br /> <br />  <br /> <br />
                <div style={{ textAlign: "center" }}>
                    <Paper color={this.state.colors.Paper} clickable={this.props.showCountDown} onClick={this._onPaperButtonSelect} />
                </div>
                <br /> <br /> <br /> <br />  <br /> <br />
                <div style={{ textAlign: "center" }}>
                    <Scissor color={this.state.colors.Scissor} clickable={this.props.showCountDown} onClick={this._onScissorButtonSelect} />
                </div>
            </div>
        );



    }

} 