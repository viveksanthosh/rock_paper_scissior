import React from 'react';
import './shapes.css';
console.log(45678986545678)

const Rock = ({ onClick }) => (<button name="Rock" onClick={onClick} >
    <svg height="100" width="100">
        <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="red" />
    </svg>
</button>)

const Paper = ({ onClick }) => (<button onClick={onClick} name="Paper" type="button">
    <svg width="100" height="100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">

        <rect x="10" y="10" width="100" height="100"></rect>
    </svg>
</button>)


const Scissor = ({ onClick }) => (<button onClick={onClick} name="Scissor" className="xButton">
    <p className="largeX">X</p>
</button>)

export { Paper, Rock, Scissor }