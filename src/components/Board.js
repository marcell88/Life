/*

Coordinates for cells

    0 1 2 3 4 ->
    | | | | |
0 - # # # # #
1 - # # # # #
2 - # # # # #
3 - # # # # #
4 - # # # # #
|
V

*/

//////////////////////////////////////
export class Cell  {
    constructor(x, y) {
        this.state = 0;
        this.nextState = 0;
        this.x = x;
        this.y = y;
    }
}

//////////////////////////////////////
export class Board {

    constructor (width, height) {
        this._width = width;
        this._height = height;
        this._getKey = (x, y) => x + '-' + y;

        this.cells = new Map();
        for (let x = 0; x<width; x++) {
            for (let y = 0; y<height; y++) {
                const key = this._getKey(x, y);
                const newCell = new Cell(x, y);
                this.cells.set(key, newCell);
            }
        }
        
    }

    //wrapped       
    _shifted ( cell, deltaX, deltaY ) {
        deltaX %= this._width;
        deltaY %= this._height;
        const shiftedX = deltaX >= 0 ? (cell.x + deltaX) % this._width : (this._width + cell.x + deltaX) % this._width;
        const shiftedY = deltaY >= 0 ? (cell.y + deltaY) % this._height : (this._height + cell.y + deltaY) % this._height;
        return this.cells.get(this._getKey(shiftedX, shiftedY));
    }

    _getCell(x, y) {
        return this.cells.get(this._getKey(x, y));
    }

    _getAllNeighborsState(cell) {
        return [
            board._shifted(cell, 0, 1),
            board._shifted(cell, 1, 1),
            board._shifted(cell, 1, 0),
            board._shifted(cell, 1, -1),
            board._shifted(cell, 0, -1),
            board._shifted(cell, -1, -1),
            board._shifted(cell, -1, 0),
            board._shifted(cell, -1, 1)
        ].reduce((sum, item) => sum + item.state, 0);
    }

    makeRound() {
        this.cells.forEach( cell => {
            const neighbors = this._getAllNeighborsState(cell);
            if (cell.state === 0 && neighbors === 3) {
                cell.nextState = 1;
            } else if ( cell.state === 1 && (neighbors === 3 || neighbors === 2) ) {
                cell.nextState = 1;
            } else {
                cell.nextState = 0;
            }
        });
        this.cells.forEach( cell => {
            cell.state = cell.nextState;
            cell.nextState = 0;
        });
    }

}

const board = new Board(10, 10);
const cell = board._getCell(9, 9);
console.log(board._getAllNeighborsState(cell));