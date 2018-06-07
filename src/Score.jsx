import React from 'react';
import './Score.css';

export default class Score extends React.Component {
    render() {
        return <p className="score">Score: {this.props.score}</p>;
    }
}