import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percentage: 0
        }
    }
    componentWillMount() {
        setInterval(() => {
            this.setState({ percentage: (2 + this.state.percentage) })
        }, 100)
    }
    render() {
        let width = (this.state.percentage%100) + "%";
        return (
            <div className="progress" style = {{height: "10px"}}>
                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40"
                    aria-valuemin="0" aria-valuemax="100" style={{ width}}>
                </div>
            </div>
        )
    }
}