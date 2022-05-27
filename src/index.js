import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SnakeGame, Direction} from './snake.js';

class Square extends React.Component {
  render() {
    return (
      <button className={this.props.color}></button>
    ); //return
  } //render

} //Square

class SquareBuilder {
  constructor(color) {
    this.square = <Square color={color}/>
  } //constructor

  setColor(color) {
    this.square = <Square color={color}/>
  } //setColor
} //SquareBuilder

class Board extends React.Component {

  renderRow(i) {
    const sqBuilders = this.props.grid[i];
    var row = []
    for (let x = 0; x < sqBuilders.length; x++) {
      row.push(sqBuilders[x].square);
    } //for
    return <div className='board-row'>{row}</div>
  } //renderRow

  renderGrid() {
    var grid = [];
    for (let i = 0; i < this.props.grid.length; i++) {
      grid.push(this.renderRow(i));
    } //for
    return grid
  } //renderGrid

  render() {
    return (
      <div> 
        {this.renderGrid()}
      </div>
    );
  } //render
} //Board

class Game extends React.Component { 

  constructor(props) {
    super(props);
    this.loop = null;
    this.gameStart = false;
    this.row = parseInt(props.row, 10);
    this.col = parseInt(props.col, 10);
    this.snakeGame = new SnakeGame(this.row, this.col);
    let arr = [];
    for (let i = 0; i < this.row; i++) {  
      let temp = [];
      for (let j = 0; j < this.col; j++) {
        temp.push(new SquareBuilder("white"));
      } //for
      arr.push(temp);
    } //for
    this.state = {
      grid: arr,
    }; //state
    this.state.grid = this.updateGrid();
  } //constructor

  updateGrid() {
    const newGrid = this.state.grid.slice();
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col; col++) {
        if (this.snakeGame.grid[row][col]) { //not null
          newGrid[row][col].setColor("black");
        } else {
          newGrid[row][col].setColor("white");
        } //if
      } //for
    } //for
    return newGrid;
  } //updateGrid

  handleKeyPressed(e) {
    if (!this.gameStart) {
      this.start();
      this.gameStart = true;
    } //if
    switch (e.code) {
      case 'KeyW':
        if (this.snakeGame.direction !== Direction.DOWN) {
          this.snakeGame.direction = Direction.UP;
        } //if
      break;
      case 'KeyA':
        if (this.snakeGame.direction !== Direction.RIGHT) {
          this.snakeGame.direction = Direction.LEFT;
        } //if
      break;
      case 'KeyS':
        if (this.snakeGame.direction !== Direction.UP) {
          this.snakeGame.direction = Direction.DOWN;
        } //if
      break;
      case 'KeyD':
        if (this.snakeGame.direction !== Direction.LEFT) {
          this.snakeGame.direction = Direction.RIGHT;
        } //if
      break;
      case 'KeyP':
        this.pause();
        this.gameStart = false;
      break;
    } //switch
    
  } //handleKeyPressed

  start() {
    if (!this.loop) {
      this.loop = setInterval(() => { //for some odd reason, snakeGame cannot be referenced from a helper function
        if (this.snakeGame.move()) {
          //this.snakeGame.move();
        } else {
          this.pause();
          this.gameStart = false;
          this.snakeGame = new SnakeGame(this.row, this.col);
        } //else
        this.setState({grid: this.updateGrid(),});
      }, 75);
    } //if
  } //start

  pause() {
    if (this.loop) {
      clearInterval(this.loop);
      this.loop = null;
    } //if
  } //pause

  render() {
    return (
      <div tabIndex="0" id="pog" className="game" onKeyDown={(e) => {
            this.handleKeyPressed(e);
            //start
          }}>
        <div className="game-board">
          <Board grid={this.state.grid}/> 
        </div>
      </div>
    ); //return
  } //render
} //Game

const root = ReactDOM.createRoot(document.getElementById("root"));

function handleClicked() {
  console.log("pog");
  document.getElementById("pog").focus();
} //handleClicked
document.addEventListener('click', handleClicked);

root.render(<Game row="19" col="19" />);