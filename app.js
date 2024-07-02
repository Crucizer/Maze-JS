var canvas = document.querySelector("canvas");
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext('2d');

class Node {
    constructor(y,x, size, color="turquoise") {
        this.x = x;
        this.y = y;
        this.value = 0;
        this.visited = false;
        this.size = size;
        this.color = color;
    }

    getNeighbors() {
        neighbors = [];
        if (this.y > 0) {
            neighbors.push((y-1, x));
        }
        if (this.x > 0) {
            neighbors.push((y, x-1));
        }
        if(x< this.size -1 ) {
            neighbors.push((y,x+1));
        }
        if (y < size -1) {
            neighbors.push((y+1, x));
        }

        return neighbors;   
    }
}

class Maze {
    constructor(size) {
        this.size = size;
        this.maze = [];

        // making the maze
        for(let i =0; i<this.size ; i++) {
            let row = [];
            for(let j=0;j<this.size; j++) {
                row.push(new Node(i,j, this.size));
            }
            this.maze.push(row);
        } 
    }

    makeBoard() {
        this.cellSize = canvas.width / this.size;
        // drawing the maze
        for (let i = 0; i<this.size; i++) {
            for (let j = 0; j<this.size; j++) {
                console.log(this.maze[i][j].color);
                this.drawRect(this.cellSize*i, this.cellSize*j,this.maze[i][j].color);
            }
        }
        // drawing the borders

        for (let i = 0; i <= this.size; i++) {
            // Draw horizontal lines
            this.drawLine(0, this.cellSize * i, canvas.width, this.cellSize * i);
            // Draw vertical lines
            this.drawLine(this.cellSize * i, 0, this.cellSize * i, canvas.height);
        }

    }

    drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    drawRect(y,x, color="blue") {
        ctx.fillStyle = color;
        ctx.fillRect(x,y, this.cellSize, this.cellSize);

    }
}

let Board = new Maze(10);
Board.makeBoard();