import React, { Component } from 'react';
import './App.css';
import Score from './Score';
import ResetBtn from './ResetBtn';
import Board from './Board';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      board: [
        [8192,16384,32768,65536],
        [4096,2048,1024,512],
        [32,64,128,256],
        [16,8,4,2]
      ],
      score: 131076
    }
    this.resetBoard();
  }

  resetBoard() {
    let newBoard = this.state.board;
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 4; ++j) {
        newBoard[i][j] = 0;
      }
    }
    let a = Math.floor(Math.random()*4), b = Math.floor(Math.random()*4);
    newBoard[a][b] = Math.random()<0.2? 4: 2;
    let c = Math.floor(Math.random()*4), d = Math.floor(Math.random()*4);
    while (c === a && d === b) {c = Math.floor(Math.random()*4); d = Math.floor(Math.random()*4);}
    newBoard[c][d] = Math.random()<0.2? 4: 2;
    this.state.score = newBoard[a][b]+newBoard[c][d];
    this.setState({
      board: newBoard
    })
  }

  moveBoard(e) {
    let newBoard = this.state.board, newScore = this.state.score, isChanged = false;
    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
      move(1);
    } else if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      move(2);
    } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
      move(3);
    } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      move(4);
    }
    if (isChanged) {
      spawn();
      this.setState({
        board: newBoard,
        score: newScore
      });
    } else if (isOver()) {
      alert("Game Over!\nYour score is " + newScore);
      this.resetBoard();
    }
    function move(dir) {
      fillSpace(dir);
      mergeTile(dir);
      fillSpace(dir);
    }
    function fillSpace(dir) {
      if (dir === 1) {
        for (let i = 0; i < 3; ++i)
          for (let j = 0; j < 4; ++j)
            if (!newBoard[i][j])
              for (let k = i+1; k < 4; ++k)
                if (newBoard[k][j]) {
                  isChanged = true;
                  newBoard[i][j] = newBoard[k][j];
                  newBoard[k][j] = 0;
                  break;
                }
      } else if (dir === 2) {
        for (let i = 0; i < 3; ++i)
          for (let j = 0; j < 4; ++j)
            if (!newBoard[j][i])
              for (let k = i+1; k < 4; ++k)
                if (newBoard[j][k]) {
                  isChanged = true;
                  newBoard[j][i] = newBoard[j][k];
                  newBoard[j][k] = 0;
                  break;
                }
      } else if (dir === 3) {
        for (let i = 3; i > 0; --i)
          for (let j = 0; j < 4; ++j)
            if (!newBoard[i][j])
              for (let k = i-1; k >= 0; --k)
                if (newBoard[k][j]) {
                  isChanged = true;
                  newBoard[i][j] = newBoard[k][j];
                  newBoard[k][j] = 0;
                  break;
                }
      } else if (dir === 4) {
        for (let i = 3; i > 0; --i)
          for (let j = 0; j < 4; ++j)
            if (!newBoard[j][i])
              for (let k = i-1; k >= 0; --k)
                if (newBoard[j][k]) {
                  isChanged = true;
                  newBoard[j][i] = newBoard[j][k];
                  newBoard[j][k] = 0;
                  break;
                }
      }
    }
    function mergeTile(dir) {
      if (dir === 1) {
        for (let i = 0; i < 3; ++i)
          for (let j = 0; j < 4; ++j)
            if (newBoard[i][j] && newBoard[i][j] === newBoard[i+1][j]) {
              isChanged = true;
              newScore += newBoard[i][j];
              newBoard[i][j] *= 2;
              newBoard[i+1][j] = 0;
            }
      } else if (dir === 2) {
        for (let i = 0; i < 3; ++i)
          for (let j = 0; j < 4; ++j)
            if (newBoard[j][i] && newBoard[j][i] === newBoard[j][i+1]) {
              isChanged = true;
              newScore += newBoard[j][i];
              newBoard[j][i] *= 2;
              newBoard[j][i+1] = 0;
            }
      } else if (dir === 3) {
        for (let i = 3; i > 0; --i)
          for (let j = 0; j < 4; ++j)
            if (newBoard[i][j] && newBoard[i][j] === newBoard[i-1][j]) {
              isChanged = true;
              newScore += newBoard[i][j];
              newBoard[i][j] *= 2;
              newBoard[i-1][j] = 0;
            }
      } else if (dir === 4) {
        for (let i = 3; i > 0; --i)
          for (let j = 0; j < 4; ++j)
          if (newBoard[j][i] && newBoard[j][i] === newBoard[j][i-1]) {
            isChanged = true;
            newScore += newBoard[j][i];
            newBoard[j][i] *= 2;
            newBoard[j][i-1] = 0;
          }
      }
    }
    function spawn() {
      let x = Math.floor(Math.random()*4), y = Math.floor(Math.random()*4);
      while (newBoard[x][y]) {x = Math.floor(Math.random()*4); y = Math.floor(Math.random()*4);}
      newBoard[x][y] = Math.random()<0.2? 4: 2;
    }
    function isOver() {
      for (let i = 0; i < 4; ++i)
          for (let j = 0; j < 4; ++j)
            if ( !newBoard[i][j] || (i-1>=0 && newBoard[i][j] === newBoard[i-1][j]) || (i+1<4 && newBoard[i][j] === newBoard[i+1][j]) || (j-1>=0 && newBoard[i][j] === newBoard[i][j-1]) || (j+1<4 && newBoard[i][j] === newBoard[i][j+1]) )
              return false;
      return true;
    }
  }

  render() {
    document.onkeyup = function(e) {
      this.moveBoard(e);
    }.bind(this);
    return (
      <div className="container">
        <div className="top">
          <h1 className="gameName">2048</h1>
          <Score score={this.state.score} />
          <ResetBtn reset={this.resetBoard.bind(this)}/>
        </div>
        <Board board={this.state.board} />
      </div>
    );
  }
}