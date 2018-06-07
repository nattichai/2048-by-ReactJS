import React from 'react';
import './ResetBtn.css';

export default class ResetBtn extends React.Component {
    render() {
        return <p className="resetbtn" onClick={this.props.reset}>reset</p>;
    }
}