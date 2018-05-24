import React from 'react';

export default class Timer extends React.Component {
    constructor() {
        super();
        this.intervalId;
        this.state = {
            count: 5,
            summand: -1       // -1: до начала игры, 1: после начала игры
        }
        this.convertToString = this.convertToString.bind(this);
    }

    componentDidMount() {
        this.intervalId = window.setInterval(() => {
            if (this.state.count === 0) {
                this.setState(prev => {
                    return {
                        count: prev.count + 1,
                        summand: 1
                    }
                });
                return;
            } else {
                this.setState(prev => {
                    return {count: prev.count + prev.summand}
                });
            }
            return;
        }, 1000);
    }

    componentWillUnmount() {
        window.clearInterval(this.intervalId);
    }

    convertToString(count) {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60;
        let result = (minutes < 10) ? '0' + String(minutes) : String(minutes);
        result += ':';
        result += (seconds < 10) ? '0' + String(seconds) : String(seconds);
        if (this.state.summand < 0) { result = '-' + result; }
        return result;
    }

    render() {
        return (
          <div id="timer">
            {this.convertToString(this.state.count)}
          </div>
        );
    }
}
