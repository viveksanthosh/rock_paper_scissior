import React from 'react';
import './LandingPage.css';
import 'bootstrap/dist/css/bootstrap.css';

export default ({ userCount, lookingForOpponent }) => (
    <div className="container">
        <div className="row">
            <div className="col-sm-12">
                <p className="largeRed">Rock</p>
                <p className="largeBlue">Paper</p>
                <p className="largeOrange">Scissor</p>
                <br />
                <p className="largeWhite">{userCount}</p>
                <p className="largeWhite">Player currently online</p>
                <br/>
                <br/>
                <div style={{ textAlign: "center" }}>
                    <button className="btn btn-primary" onClick={lookingForOpponent}> PLAY NOW</button>
                </div>
            </div>
        </div>
    </div>
);

