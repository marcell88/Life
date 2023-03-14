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

export class Cell  {
    constructor(x, y) {
        this.state = 0;
        this.nextState = 0;
        this.x = x;
        this.y = y;
    }
}

//////////////////////////////////

export class Board {

    constructor ( {width, height}, {handleCellClick}, selector) {
        this._width = width;
        this._height = height;
        this._element = document.querySelector(selector);

        this.cells = new Map();
        for (let x = 0; x<this._width; x++) {
            for (let y = 0; y<this._height; y++) {
                const key = this._getKey(x, y);
                const newCell = new Cell(x, y);
                this.cells.set(key, newCell);
            }
        }

        this._handleCellClickRef = (evt) => {

        }

        this._setEventListeners();
    }

    _getKey(x, y) {
        return x + '-' + y;
    }

    _getCell(x, y) {
        return this.cells.get(this._getKey(x, y));
    }

    //Логика расчета состояний - wrapped
    _shifted ( cell, deltaX, deltaY ) {
        deltaX %= this._width;
        deltaY %= this._height;
        const shiftedX = deltaX >= 0 ? (cell.x + deltaX) % this._width : (this._width + cell.x + deltaX) % this._width;
        const shiftedY = deltaY >= 0 ? (cell.y + deltaY) % this._height : (this._height + cell.y + deltaY) % this._height;
        return this.cells.get(this._getKey(shiftedX, shiftedY));
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

    //Слушатели
    _setEventListeners() {
        this._element.addEventListener('click', () => {});
    }

}

