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

//////////////////////////////////

class Cell {

    constructor(x, y) {
        this.state = 0;
        this.nextState = 0;
        this.x = x;
        this.y = y;
    }

    setState(state) {
        if (state) {
            this.state = 1;
        } else {
            this.state = 0;
        }
    }

}

//////////////////////////////////

export class Board {

    constructor ( {width, height, wrap = true}, {handleCellClick} ) {
        this._width = width;
        this._height = height;
        this._shiftOne = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
        this._wrap = wrap;

        this._cells = new Map();
        for (let x = 0; x<this._width; x++) {
            for (let y = 0; y<this._height; y++) {
                const key = this._getKey(x, y);
                const newCell = new Cell(x, y);
                this._cells.set(key, newCell);
            }
        }

    }

    //Public
    setState(x, y, state = 1) {
        const cell = this.getCell(x, y);
        cell.setState(state);
    }

    getCell(x, y) {
        return this._cells.get(this._getKey(x, y));
    }

    makeRound() {
        this._cells.forEach( cell => {
            const neighbors = this._getAllNeighborsState(cell);
            if (cell.state === 0 && neighbors === 3) {
                cell.nextState = 1;
            } else if ( cell.state === 1 && (neighbors === 3 || neighbors === 2) ) {
                cell.nextState = 1;
            } else {
                cell.nextState = 0;
            }
        });
        this._cells.forEach( cell => {
            cell.state = cell.nextState;
            cell.nextState = 0;
        });
    }

    _ifCellValid(x, y) {
        if (this._wrap) return true;
        return !(x < 0 || y < 0 || x > this._width - 1 || y > this._height - 1)
    }

    //Логика расчета состояний - математика для wrap
    _shiftedWrap ( cell, deltaX, deltaY ) {
        deltaX %= this._width;
        deltaY %= this._height;
        const shiftedX = deltaX >= 0 ? (cell.x + deltaX) % this._width : (this._width + cell.x + deltaX) % this._width;
        const shiftedY = deltaY >= 0 ? (cell.y + deltaY) % this._height : (this._height + cell.y + deltaY) % this._height;
        return this._cells.get(this._getKey(shiftedX, shiftedY));
    }

    _getAllNeighborsState(cell) {

        return this._shiftOne
            .map( coord => this._shifted(cell, coord[0], coord[1]))
            .filter( cell => cell !== null)
            .reduce((sum, item) => sum + item.state, 0);

        return [
            this._shifted(cell, 0, 1),
            this._shifted(cell, 1, 1),
            this._shifted(cell, 1, 0),
            this._shifted(cell, 1, -1),
            this._shifted(cell, 0, -1),
            this._shifted(cell, -1, -1),
            this._shifted(cell, -1, 0),
            this._shifted(cell, -1, 1)
        ].reduce((sum, item) => sum + item.state, 0);

    }

    //Вспомогательные
    _getKey(x, y) {
        return x + '-' + y;
    }

}

