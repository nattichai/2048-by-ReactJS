import React from 'react';
import './Tile.css';

export default class Tile extends React.Component {

    render() {
        let value = this.props.value;
        let bgColor = {0: '#cdc0b4', 2: '#eee4da', 4: '#ece0c8', 8: '#f2b179', 16: '#f59563', 32: '#f67c5f', 64: '#fe5d43', 128: '#fad177', 256: '#f9d067', 512: '#f9ca58', 1024: '#ecc441', 2048: '#edc12d', 4096: '#ef676d', 8192: '#ec4d59', 16384: '#f44041', 32768: '#72b3db', 65536: '#5e9fdf', 131072: '#1a81cd'};
        let textColor = {0: '#cdc0b4', 2:'#776e65', 4:'#776e65'};
        let textSize = {0: 60, 1: 57, 2: 54, 3: 48, 4: 42, 5: 36}
        let style = {
            background: bgColor[value],
            color: value >= 8? '#f9f6f2': textColor[value],
            fontSize: textSize[Math.floor(Math.log10(value))],
            'line-height': 2*(60-textSize[Math.floor(Math.log10(value))])
        };
        return (
            <div className={"tile "+this.props.loc} style={style}>
                <p>{value? value: "."}</p>
            </div>
        );
    }
}