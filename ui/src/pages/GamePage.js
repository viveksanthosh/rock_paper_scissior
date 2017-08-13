import React from 'react';
import './LandingPage.css';
import { Paper, Rock, Scissor } from '../components/shapes';
import 'bootstrap/dist/css/bootstrap.css';

export default () => (
    <div>
        <p className="largeWhite">Player 1 vs Player 2</p>
        <br /> <br />
        <div style={{ textAlign: "center" }}>
            <Rock />
        </div>
        <br /> <br /> <br /> <br />  <br />
        <div style={{ textAlign: "center" }}>
            <Paper />
        </div>
        <br /> <br /> <br /> <br />  <br />
        <div style={{ textAlign: "center" }}>
            <Scissor />
        </div>
    </div>
);

