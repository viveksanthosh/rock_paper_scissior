import React from 'react';
import './shapes.css';

const Rock = () => (<button >
    <svg height="100" width="100">
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
</button>)

const Paper = () => (<button type="button" onclick="alert('Hello world!')">
    <svg width="100" height="100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">

        <rect x="10" y="10" width="100" height="100"></rect>
    </svg>
</button>)


const Scissor = () => (<button>
    <p className="largeX">X</p>
</button>)

export { Paper, Rock, Scissor }