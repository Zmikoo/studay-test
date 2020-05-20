// 官方小游戏示例
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square (props) {
      return (
        <button className="square" 
                onClick = {()=> { props.onClick() }}>
          {props.value}
        </button>
      );
  }
  
class Board extends React.Component {
  renderSquare(i) {
    return <Square 
              value={this.props.squares[i]}
              // value = { i }
              onClick = { ()=> this.props.onClick(i) }
            />;
  }

  // renderSquareRow(rowNum) {
  //   const crrRowArr;
  //   if (rowNum === 0) {
  //     crrRowArr = [0,1,2];
  //   } else if (rowNum === 1) {
  //     crrRowArr = [3,4,5]
  //   } else {
  //     crrRowArr = [6,7,8]
  //   }
  //   crrRowArr.map((state,index) => {
  //     return <Square key={index} value={this.props.squares[i]} onClick = { ()=> this.props.onClick(i) }
  //   />;
  //   })
  // }

  render() {
    return (
      <div>
        <div className="board-row">
          {/* {this.renderSquareRow(0)} */}
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
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),// 最开始是9个格子 都是null的数组
      }],
      xIsNext: true,
      stepNumber: 0,
      clickIndex: [],
      clickIndexMap: {
        0: 'X: 1,Y: 1',
        1: 'X: 2,Y: 1',
        2: 'X: 3,Y: 1',
        3: 'X: 1,Y: 2',
        4: 'X: 2,Y: 2',
        5: 'X: 3,Y: 2',
        6: 'X: 1,Y: 3',
        7: 'X: 2,Y: 3',
        8: 'X: 3,Y: 3'
      }
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const clickIndex =  this.state.clickIndex.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];//此次点击前的最新的9个格子的状态数据

    const squares = current.squares.slice(); // 深拷贝一份此次点击前9个格子状态的数组数据
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // 将此次点击的第i个格子的值由null改成X或O
    this.setState({
      history: history.concat([{
        squares: squares,// 将此次点击后的9个格子的状态存储到点击历史中
      }]),
      xIsNext: !this.state.xIsNext,// 下次点击应该是X还是O
      stepNumber: history.length, // 一共走了几步
      clickIndex: clickIndex.concat([i])// i表示点击的是第几个格子
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];// 当前的9个格子的数据
    const winner = calculateWinner(current.squares);
    let self = this;
    const moves = history.map((step,move) => {
      const clickEleIndex = self.state.clickIndex[move - 1];
      const desc = move ? 'Go to move #' + move + '(坐标位置:' + self.state.clickIndexMap[clickEleIndex] +')'  : 'Go to start';
      if (move === history.length - 1) {
        return (      
          <li key={move}>
            <button onClick = { () => this.jumpTo(move) }><strong>{desc}</strong></button>
          </li>
        )
      }
      return (
        <li key={move}>
          <button onClick = { () => this.jumpTo(move) }>{desc}</button>
        </li>
      )
    });

    let status;
    if (winner) {
      status = 'Winner:' + winner;
    } else {
      status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = { (i)=> { this.handleClick(i) } }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
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
      return squares[a];
    }
  }
  return null;
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  