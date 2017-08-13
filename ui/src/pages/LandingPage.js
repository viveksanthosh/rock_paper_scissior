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
                <br />
                <br />
                <div style={{ textAlign: "center" }}>
                    <button className="btn btn-primary" onClick={lookingForOpponent}> PLAY NOW</button>
                </div>
                <br />
                <br />
                <p className="largeWhite" style={{ textDecoration: "underline" }}>RULES</p>
                <p className="normalWhite" >1. The Circle is rock, square is paper and the X is scissor</p>
                <p className="normalWhite" >2. Rock beats scissor, scissor beats paper and paper beats rock</p>
                <p className="normalWhite" >3. You have 5 seconds to choose, if you dont choose and your opponent does, you lose !</p>
            </div>
        </div>
    </div>
);

