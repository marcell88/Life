//Подсчет соседей
const neighbours = (array, x, y, columns, rows) => {
    let x_plus1 = (x==columns-1) ? 0 : (x+1);
    let x_minus1 = (x==0) ? (columns-1) : (x-1);
    let y_plus1 = (y==rows-1) ? 0 : (y+1);
    let y_minus1 = (y==0) ? (rows-1) : (y-1);

    return (array[x][y_minus1] + 
        array[x_plus1][y_minus1] + 
        array[x_plus1][y] + 
        array[x_plus1][y_plus1] + 
        array[x][y_plus1] + 
        array[x_minus1][y_plus1] + 
        array[x_minus1][y] + 
        array[x_minus1][y_minus1]);
}

//Игра жизни - на вход одномерный массив с состонием точек (строка 1, строка 2 и тд),  
//список (list) элементов (тоже одномерный)
//и количество строк и колонок на экране.
//Возвращает - новое состоние массива (одномерного).
const gameOfLife = (array, list, rows, columns) => {

    let result = new Array(rows*columns);

    //Переводим массив в двумерный
    let cells = new Array(columns);
    let cells_next = new Array(rows);
    for (let i = 0; i<columns; i++) {
        cells[i] = new Array(rows);
        cells_next[i] = new Array(rows);
    }
    for (let y=0; y<rows; y++) {
        for (let x=0; x<columns; x++) {
            cells[x][y] = array[columns*y + x];
            cells_next[x][y] = 0;
        }
    }

    //запускаем игру - расчет след состояния
    for (let y=0; y<rows; y++) {
        for (let x=0; x<columns; x++) {
            let n = neighbours(cells, x, y, columns, rows);
            if (cells[x][y]==0 && n==3) {
                cells_next[x][y] = 1;
            } else if (cells[x][y]==1 && (n==3 || n==2)) {
                cells_next[x][y] = 1;
            } else {
                cells_next[x][y] = 0;
            }
        }
    }

    //копируем и рисуем состояния
    for (let x=0; x<columns; x++) {
        for (let y=0; y<rows; y++) {
            cells[x][y] = cells_next[x][y];
            cells_next[x][y] = 0;
            if (cells[x][y] == 1) {
                list[columns*y + x].style.backgroundColor = "rgba(256, 0 , 0, 1)";     
                result[columns*y + x] = 1;
            } else {
                list[columns*y + x].style.backgroundColor = "transparent";   
                result[columns*y + x] = 0;
            }
        }
    }

    return result;
}