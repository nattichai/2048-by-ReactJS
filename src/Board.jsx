import React from 'react';
import Tile from './Tile';
import './Board.css';

export default class Tiles extends React.Component {
    render() {
        return (
            <div className="board">
                {this.props.board.map(function(row, i){
                return (
                    <div key={i}>
                    {row.map(function(col, j){
                        return (
                        <Tile
                            key={4*i+j}
                            row={i}
                            col={j}
                            value={col} />
                        );
                    })}
                    </div>
                )})}
            </div>
        );
    }
}