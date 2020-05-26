import React, { useState } from 'react';
import { FaCircle, FaTimes } from 'react-icons/fa';

export default () => {
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [playerTurn, setPlayerTurn] = useState(-1);
  const [turns, setTurns] = useState(0);
  const [gameState, setGameState] = useState(true);
  const startGame = () => {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
    setPlayerTurn(-1);
    setTurns(0);
    setGameState(true);
  }
  const renderIcon = (i, j) => {
    const value = board[i][j];
    if (value === -1) {
      return <FaTimes/>;
    } else if (value === 1){
      return <FaCircle/>;
    } else {
      return null;
    }
  }
  const checkSum = sum => {
    if (sum === -3){
      alert('Player 1(X) wins!');
      setGameState(false);
      return true;
    } else if (sum === 3){
      alert('Player 2(O) wins!');
      setGameState(false);
      return true;
    }
    return false;
  }
  const checkWinner = (row, col) => {
    //check if the column has a win
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += board[i][col];
    }
    if (checkSum(sum)) return;
    //check if the row has a win
    sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += board[row][i];
    }
    if (this.checkSum(sum)) return;
    //check if the top left to bottom right diagonal has a win
    sum = 0;
    if (row === col) {
      for (let i = 0; i < 3; i++) {
        sum += board[i][i];
      }
      if (this.checkSum(sum)) return;
      sum = 0;
    }
    //check if the top right to bottom left diagonal has a win
    if ((row === 2 && col === 0) || (row === 0 && col === 2)) {
      for (let i = 0; i < 3; i++) {
        sum += board[i][2-i];
      }
      if(this.checkSum(sum)) return;
      sum = 0;
    }
    //check if it's a tie
    if (turns === 9) {
      alert("It was a tie!");
      setGameState(false);
      return;
    }
  }
  const updateValue = (i, j) => {
    // only respond if the tile isn't occupied, and if the game hasn't ended
    if (board[i][j] === 0 && gameState) {
      let newPosition = board;
      newPosition[i][j] = playerTurn;
      setBoard(newPosition);
      setPlayerTurn((playerTurn === -1) ? 1 : -1);
      setTurns(prevTurn => prevTurn + 1);
      checkWinner(i, j);
    }
  }
  return null;
}