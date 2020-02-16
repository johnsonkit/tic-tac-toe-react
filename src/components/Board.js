import React from 'react';
import Square from '../Square';

class Board extends React.Component {
  // constructor(props) {
    // super(props);
    // this.state = {
    //   squares: Array(9).fill(null),
    //   xIsNext: true
    // }
    // this.handleClick = this.handleClick.bind(this);
  // }
  // handleClick (i) {
  //   const squares = this.state.squares.slice();
  //   if (squares[i] || calculateWinner(squares)) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }


  renderSquare(i) {

    const { winPosition, squares } = this.props;
    const hightlightSquare = winPosition && (winPosition.indexOf(i) > -1) ? true : false;
    
    return <Square 
              key={i}
              value={squares[i]} 
              onClick={()=>this.props.onClick(i)}
              hl={hightlightSquare}
            />;
  }


  renderSquareAll() {
    let rowWrapperHTML = [];
    for (let i = 0; i < 3; i++) {
      let squareWrapper = [];
      
      for (let j = i * 3; j < (i + 1)*3; j++) {
        squareWrapper.push(this.renderSquare(j));
      }
      rowWrapperHTML.push(<div key={i} className="board-row">{squareWrapper}</div>);
    }

    return rowWrapperHTML;
  }

  render() {
    
    return (
      <div>
        {this.renderSquareAll()}

        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    )
  }
}



export default Board;