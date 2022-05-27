const Direction = {
    UP: Symbol("up"),
    DOWN: Symbol("down"),
    RIGHT: Symbol("right"),
    LEFT: Symbol("left"),
} //Direction

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    } //constructor
} //SnakePart

class SnakeGame {
    constructor(row, col) {
        this.gameOver = false;
        this.row = row;
        this.col = col;
        this.direction = Direction.RIGHT;
        this.player = {
            x: Math.floor(this.row / 2), //x is the row
            y: Math.floor(this.col / 2), //y is the col
        };
        this.snake = [new SnakePart(Math.floor(this.row / 2), Math.floor(this.col / 2))];
        this.grid = [];
        for (let i = 0; i < this.row; i++) {  
            let temp = [];
            for (let j = 0; j < this.col; j++) {
              temp.push(0);
            } //for
            this.grid.push(temp);
          } //for
        this.grid[this.player.x][this.player.y] = 1;
        this.placeFood();
    } //constructor

    move() {
        let head = Object.assign({}, this.snake[0]); //deep copy objects with no nested objects
        let tail = Object.assign({}, this.snake[this.snake.length - 1]);

        /** 
        let currentX = this.player.x; //row
        let currentY = this.player.y; //col
        let newX = this.player.x;
        let newY = this.player.y;
        */
        switch (this.direction) {
            case Direction.LEFT:
                //console.log("left");
                //newY--;
                head.y--;
            break;
            case Direction.RIGHT:
                //console.log("right");
                //newY++;
                head.y++;
            break;
            case Direction.DOWN:
                //console.log("down");
                //newX++;
                head.x++;
            break;
            case Direction.UP:
                //console.log("up");
                //newX--;
                head.x--;
            break;
        } //switch
        if (head.x >= this.row || head.y >= this.col || head.x < 0 || head.y < 0) { //outbounds
            return false;
        } //if
        if (this.grid[head.x][head.y] === 1) { //body collision 
            return false;
        } //if
        let food = this.grid[head.x][head.y];
        this.grid[head.x][head.y] = 1;
        this.snake.unshift(head);
        if (food === 2) { //if there is food
            //dont pop tail
            this.placeFood();
        } else {
            this.grid[tail.x][tail.y] = 0;
            this.snake.pop();
        } //if

        /** 
        this.grid[currentX][currentY] = 0;
        this.grid[newX][newY] = 1;
        this.player.x = newX;
        this.player.y = newY;
        */
        return true;
    } //move

    placeFood() {
        let x = Math.floor(Math.random() * this.row);
        let y = Math.floor(Math.random() * this.col);
        if (this.grid[x][y] === 1) {
            this.placeFood();
        } else {
            this.grid[x][y] = 2;
            console.log(x + ", " + y);
        } //if
    } //placeFood

} //SnakeGame

export {Direction, SnakeGame}