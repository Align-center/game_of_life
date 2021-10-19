'use strict';

document.addEventListener('DOMContentLoaded', function loaded () {

    
    var matrix = {
        width: 5,
        height: 5
    };
    var grid = [];
    var nextGrid = [];
    const game = document.querySelector('.game');
    const next = document.querySelector('.next');

    function initializeGrid () {

        let count = 0;

        for (let i = 0; i < matrix.width; i++) {

            for (let j = 0; j < matrix.height; j++) {

                let cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.posX = i;
                cell.dataset.posY = j;
                cell.dataset.index = count;

                if (i == 2 && j == 2 || i == 1 && j == 1) {
                    cell.className += ' alive';
                }

                grid.push(cell);
                nextGrid.push(cell);
                count++;
            }
        }

        grid.map(cell => {
            game.appendChild(cell);
        });
    }

    function countNeighbours(cell) {

        let topLeft = cell - matrix.width - 1,
            top = cell - matrix.width,
            topRight = cell - matrix.width + 1,
            left = cell - 1,
            right = cell + 1,
            botLeft = cell + matrix.width - 1,
            bot = cell + matrix.width,
            botRight = cell + matrix.width + 1,
            firstRow = false,
            lastRow = false,
            firstCol = false,
            lastCol = false,
            neighbours = 0;

        if (cell < matrix.width)
            firstRow = true;
        if (cell >= matrix.width * matrix.height - matrix.width)
            lastRow = true;
        if (cell % 5 == 0)
            firstCol = true;
        if ((cell + 1) % 5 == 0)
            lastCol = true;

        // console.log({firstRow, lastRow, firstCol, lastCol});

        if (firstRow) {

            if (firstCol) {
                // x: 0, y:0
                if (/alive/gi.test(grid[right].className)) {
                    neighbours++;
                }
                if (/alive/gi.test(grid[botRight].className)) {
                    neighbours++;
                }
            } else if (lastCol) {
                //x:4, y:0
                if (/alive/gi.test(grid[left].className)) {
                    neighbours++;
                }
                if (/alive/gi.test(grid[botLeft].className)) {
                    neighbours++;
                }
            } else {

                if (/alive/gi.test(grid[right].className)) {
                    neighbours++;
                }
                if (/alive/gi.test(grid[botRight].className)) {
                    neighbours++;
                }
                if (/alive/gi.test(grid[left].className)) {
                    neighbours++;
                }
                if (/alive/gi.test(grid[botLeft].className)) {
                    neighbours++;
                }
            }

            if (/alive/gi.test(grid[bot].className)) {
                neighbours++;
            }
        } else if (lastRow) {

            if (firstCol) {

                if (/alive/gi.test(grid[right].className)) {
                    neighbours++;
                }
                if (/alive/gi.test(grid[topRight].className)) {
                    neighbours++;
                }
            } else if (lastCol) {

                if (/alive/gi.test(grid[left].className)) {
                    neighbours++;
                }
                if (/alive/gi.test(grid[topLeft].className)) {
                    neighbours++;
                }
            } else {

                if (/alive/gi.test(grid[right].className)) {
                    neighbours++;
                }
                if (/alive/gi.test(grid[topRight].className)) {
                    neighbours++;
                }
                if (/alive/gi.test(grid[left].className)) {
                    neighbours++;
                }
                if (/alive/gi.test(grid[topLeft].className)) {
                    neighbours++;
                }
            }

            if (/alive/gi.test(grid[top].className)) {
                neighbours++;
            }
        } else if (firstCol) {

            if (/alive/gi.test(grid[top].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[topRight].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[right].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[botRight].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[bot].className)) {
                neighbours++;
            }
        } else if (lastCol) {

            if (/alive/gi.test(grid[topLeft].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[top].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[bot].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[botLeft].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[left].className)) {
                neighbours++;
            }
        } else {

            if (/alive/gi.test(grid[topLeft].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[top].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[topRight].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[right].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[botRight].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[bot].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[botLeft].className)) {
                neighbours++;
            }
            if (/alive/gi.test(grid[left].className)) {
                neighbours++;
            } 
        }

        return neighbours;
    }

    function updateCell(cell, index, neighbours) {

        //RULES of Conway's Game Of Life

        var status = false //dead;

        if (/alive/gi.test(cell.className)) {
            status = true;
        }

        if (status) {

            if (neighbours < 2 || neighbours > 3) {
                
                nextGrid[index].className = 'cell';
            }
        } else {

            if (neighbours == 3) {
                nextGrid[index].className += ' alive';
            }
        }
    }

    function changeCellStatus(e) {

        if (/alive/gi.test(e.target.className)) {

            e.target.className = 'cell';
        } else {

            e.target.className += ' alive';
        }

        console.log(nextGrid);
    }

    function onClickNextGen () {

        grid.map((cell, index) => {

            let neighbours = countNeighbours(index);

            updateCell(cell, index, neighbours);
        });
    }

    next.addEventListener('click', onClickNextGen);
    game.addEventListener('click', function(e) {

        if (/cell/gi.test(e.target.className)) {
            changeCellStatus(e);
        }

        console.log(nextGrid);
    });

    initializeGrid();
});