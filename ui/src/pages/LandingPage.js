import React from 'react';
import './LandingPage.css';
import 'bootstrap/dist/css/bootstrap.css';

export default ({ redirectToGamePage }) => (
    <div className="container">
        <div className="row">
            <div className="col-sm-12">
                <p className="largeRed">Rock</p>
                <p className="largeBlue">Paper</p>
                <p className="largeOrange">Scissor</p>
                <div className="centerDiv">
                </div>
            </div>
        </div>
    </div>
);

