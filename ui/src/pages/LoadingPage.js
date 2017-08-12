import React from 'react';
import './LandingPage.css';
import 'bootstrap/dist/css/bootstrap.css';
import Loader from '../components/LoadBar'

export default ({ userCount }) => (
    <div className="container">
        <div className="row">
            <div className="col-sm-12">
                <br />
                <p className="largeWhite">{userCount}</p>
                <p className="largeWhite">Player currently online</p>
                <br />
                <br />
                <p className="largeWhite">Finding a Match</p>
                <Loader />
            </div>
        </div>
    </div>
);

