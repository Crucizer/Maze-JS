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
        let neighbors = [];
        if (this.y > 0) {
            neighbors.push([this.y - 1, this.x]);
        }
        if (this.x > 0) {
            neighbors.push([this.y, this.x - 1]);
        }
        if (this.x < this.size - 1) {
            neighbors.push([this.y, this.x + 1]);
        }
        if (this.y < this.size - 1) {
            neighbors.push([this.y + 1, this.x]);
        }

        console.log(neighbors);
        return neighbors;
    }
}

class Maze {
    constructor(size) {
        this.size = size;
        this.maze = [];
        this.bordersX = [];
        this.bordersY = [];


        // making the maze and border
        for(let i =0; i<this.size ; i++) {
            let row = [];
            let borderRowX = [];
            let borderRowY = [];

            for(let j=0;j<this.size; j++) {
                row.push(new Node(i,j, this.size));
                borderRowX.push(0);
                borderRowY.push(0);

            }
            this.maze.push(row);
            this.bordersX.push(borderRowX);
            this.bordersY.push(borderRowY);
        } 

    }

    makeBoard() {
        this.cellSize = canvas.width / this.size;
        // drawing the maze
        for (let i = 0; i<this.size; i++) {
            for (let j = 0; j<this.size; j++) {
                if (this.maze[i][j].value === 0){
                this.drawRect(this.cellSize*i, this.cellSize*j,this.maze[i][j].color);
                }
                else {
                this.drawRect(this.cellSize*i, this.cellSize*j,"red");

                }
            
            }
        }
    }

    drawBorder() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.bordersX[i][j] === 0) {
                    this.drawLine(j * this.cellSize, i * this.cellSize, (j + 1) * this.cellSize, i * this.cellSize);
                }
                if (this.bordersY[i][j] === 0) {
                    this.drawLine(j * this.cellSize, i * this.cellSize, j * this.cellSize, (i + 1) * this.cellSize);
                }
            }
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

    dfs_recur(y,x) {
        this.maze[y][x].visited = true;
        this.maze[y][x].value = 1;
        let neighbors = this.shuffleArray(this.maze[y][x].getNeighbors());

        for(let neighbor of neighbors) {
            let ny = neighbor[0];
            let nx = neighbor[1];
            if (!this.maze[ny][nx].visited){
                
                if (ny === y) {
                    // change in x direction
                    this.bordersX[y][Math.min(x, nx)] = 1;
                } else {
                    // change in y direction
                    this.bordersY[Math.min(y, ny)][x] = 1;
                }

                this.dfs_recur(ny, nx);

                // draw borders
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.makeBoard();
                this.drawBorder();


            }
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
}

let Board = new Maze(10);
Board.makeBoard();
Board.dfs_recur(0,0);