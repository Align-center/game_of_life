'use strict';

document.addEventListener('DOMContentLoaded', function loaded () {

    var matrix = {
        width: 50,
        height: 50
    };
    var grid = [];
    var nextGrid;
    const game = document.querySelector('.game');
    const next = document.querySelector('.next');

    function initializeGrid () {

        let count = 0;

        for (let i = 0; i < matrix.width; i++) {

            for (let j = 0; j < matrix.height; j++) {

                let node = {
                    index: count,
                    isAlive: false
                };

                if (i == 2 && j == 2 || i == 1 && j == 1)
                    node.isAlive = true;

                grid.push(node);
                count++;
            }
        }

        nextGrid = JSON.parse(JSON.stringify(grid));
        displayGrid(grid);
    }

    function displayGrid(arr) {

        game.innerHTML = '';

        arr.map(node => {

            let cell = document.createElement('div');

            if (node.isAlive) 
                cell.className = 'cell alive';
            else
                cell.className = 'cell';

            cell.dataset.posX = node.pos.x;
            cell.dataset.posY = node.pos.y;
            cell.dataset.index = node.index;

            game.append(cell);
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
        if (cell % matrix.width == 0)
            firstCol = true;
        if ((cell + 1) % matrix.width == 0)
            lastCol = true;

        if (firstRow) {

            if (firstCol) {
                // x: 0, y:0
                if (grid[right].isAlive) {
                    neighbours++;
                }
                if (grid[botRight].isAlive) {
                    neighbours++;
                }
            } else if (lastCol) {
                //x:4, y:0
                if (grid[left].isAlive) {
                    neighbours++;
                }
                if (grid[botLeft].isAlive) {
                    neighbours++;
                }
            } else {

                if (grid[right].isAlive) {
                    neighbours++;
                }
                if (grid[botRight].isAlive) {
                    neighbours++;
                }
                if (grid[left].isAlive) {
                    neighbours++;
                }
                if (grid[botLeft].isAlive) {
                    neighbours++;
                }
            }

            if (grid[bot].isAlive) {
                neighbours++;
            }
        } else if (lastRow) {

            if (firstCol) {

                if (grid[right].isAlive) {
                    neighbours++;
                }
                if (grid[topRight].isAlive) {
                    neighbours++;
                }
            } else if (lastCol) {

                if (grid[left].isAlive) {
                    neighbours++;
                }
                if (grid[topLeft].isAlive) {
                    neighbours++;
                }
            } else {

                if (grid[right].isAlive) {
                    neighbours++;
                }
                if (grid[topRight].isAlive) {
                    neighbours++;
                }
                if (grid[left].isAlive) {
                    neighbours++;
                }
                if (grid[topLeft].isAlive) {
                    neighbours++;
                }
            }

            if (grid[top].isAlive) {
                neighbours++;
            }
        } else if (firstCol) {

            if (grid[top].isAlive) {
                neighbours++;
            }
            if (grid[topRight].isAlive) {
                neighbours++;
            }
            if (grid[right].isAlive) {
                neighbours++;
            }
            if (grid[botRight].isAlive) {
                neighbours++;
            }
            if (grid[bot].isAlive) {
                neighbours++;
            }
        } else if (lastCol) {

            if (grid[topLeft].isAlive) {
                neighbours++;
            }
            if (grid[top].isAlive) {
                neighbours++;
            }
            if (grid[bot].isAlive) {
                neighbours++;
            }
            if (grid[botLeft].isAlive) {
                neighbours++;
            }
            if (grid[left].isAlive) {
                neighbours++;
            }
        } else {

            if (grid[topLeft].isAlive) {
                neighbours++;
            }
            if (grid[top].isAlive) {
                neighbours++;
            }
            if (grid[topRight].isAlive) {
                neighbours++;
            }
            if (grid[right].isAlive) {
                neighbours++;
            }
            if (grid[botRight].isAlive) {
                neighbours++;
            }
            if (grid[bot].isAlive) {
                neighbours++;
            }
            if (grid[botLeft].isAlive) {
                neighbours++;
            }
            if (grid[left].isAlive) {
                neighbours++;
            }
        }

        return neighbours;
    }

    function updateCell(cell, neighbours) {

        //RULES of Conway's Game Of Life

        if (cell.isAlive) {

            if (neighbours < 2 || neighbours > 3) {
                
                nextGrid[cell.index].isAlive = false;
            }
        } else {

            if (neighbours == 3) {

                nextGrid[cell.index].isAlive = true;
            }
        }
    }

    function changeCellStatus(e) {

        if (/alive/gi.test(e.target.className)) {

            e.target.className = 'cell';
        } else {

            e.target.className += ' alive';
        }

        let cells = Array.from(document.querySelectorAll('.cell'));

        cells.map(cell => {

            let index = cell.dataset.index;

            if (/alive/gi.test(cell.className))
                grid[index].isAlive = true;
            else
                grid[index].isAlive = false;
        });

        nextGrid = JSON.parse(JSON.stringify(grid));
    }

    function onClickNextGen () {

        grid.map(cell => {

            let neighbours = countNeighbours(cell.index);

            updateCell(cell, neighbours);
        });

        displayGrid(nextGrid);
        grid = JSON.parse(JSON.stringify(nextGrid));
    }

    next.addEventListener('click', onClickNextGen);
    game.addEventListener('click', function(e) {

        if (/cell/gi.test(e.target.className)) {
            changeCellStatus(e);
        }
    });

    initializeGrid();
});