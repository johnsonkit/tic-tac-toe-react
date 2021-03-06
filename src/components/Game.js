import React from 'react';
import Board from './Board';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    const gameResult = calculateWinner(squares); // return null or an object
   
    // ignore the below code when the square contained the 'O' or 'X' already, or the winner is determined
    if (squares[i] || gameResult) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });

  }

  jumpTo(moveId) {
    this.setState({
      stepNumber: moveId,
      xIsNext: (moveId % 2) === 0
    })
  }

  render() {
    const { history, stepNumber } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares); // return null or an object

    const moves = history.map((step, move) => {
      const clsssName = (move === stepNumber) ? 'strong' : '';
      const desc = move === 0 ? `Go to game start` : `Go to move #${move}`;
      return (
        <li key={move}> 
          <button 
            className={clsssName} 
            onClick={()=> this.jumpTo(move)}
            >
              {desc}
          </button>
        </li>
      );
      
    })

    let status;
    let winPosition;
    if (winner) {
      status = `Winner: ${winner.winner}`;
      winPosition = winner.winningPath;
    } else if (this.state.stepNumber === 9) {
      status = `Draw`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => {this.handleClick(i)}}
            winPosition={winPosition}
          />
        </div>
        <div className="game-info">
          <div className="game-info--title">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a], // 'O' or 'X'
        winningPath: lines[i] // [0, 1, 2]
      }
    }
  }
  return null;
}

export default Game;