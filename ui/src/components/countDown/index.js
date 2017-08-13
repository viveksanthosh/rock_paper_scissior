import React from 'react';

export default class extends React.Component {
    handle;
    constructor(props) {
        super(props);
        this.state = {
            time: 5
        }
    }

    componentDidMount() {
        this.handle = setInterval(() => {
            if (this.state.time === 0) {
                this.props.onTimerEnd()
            } else {
                this.setState({ time: (this.state.time - 1) })
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.handle);
    }
    render() {
        return (
            <p style={{ fontSize: "xxlarge", color: "white", textAlign: "center" }}>{this.state.time}</p>
        )
    }
}