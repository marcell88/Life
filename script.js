const createCell = () => {
    var board__space = document.querySelector(".board__space");
    var cell_container = document.createElement("div");
    var cell = document.createElement("div");
    cell_container.className='board__cell-container';
    cell.className='board__cell';
    board__space.appendChild(cell_container);
    cell_container.appendChild(cell);    
}

//Количество живых соседей
const neighbours = (array, x, y, columns, rows) => {
    let x_plus1 = (x==columns-1) ? 0 : (x+1);
    let x_minus1 = (x==0) ? (columns-1) : (x-1);
    let y_plus1 = (y==rows-1) ? 0 : (y+1);
    let y_minus1 = (y==0) ? (rows-1) : (y-1);

    return (array[x][y_minus1] + 
        array[x_plus1 ][y_minus1] + 
        array[x_plus1 ][y] + 
        array[x_plus1 ][y_plus1] + 
        array[x][y_plus1] + 
        array[x_minus1][y_plus1] + 
        array[x_minus1][y] + 
        array[x_minus1][y_minus1]);
}

//Игра жизни
const gameOfLife = () => {

    //Переводим массив в двумерный
    let rows = Math.sqrt(checked.length);
    let columns = Math.sqrt(checked.length);
    let cells = new Array(columns);
    let cells_next = new Array(rows);

    for (let i = 0; i<columns; i++) {
        cells[i] = new Array(rows);
        cells_next[i] = new Array(rows);
    }

    for (let y=0; y<rows; y++) {
        for (let x=0; x<columns; x++) {
            cells[x][y] = checked[columns*y + x];
            cells_next[x][y] = 0;
        }
    }


    //запускаем игру - расчет след состояния
    for (let y=0; y<rows; y++) {
        for (let x=0; x<columns; x++) {
            let n = neighbours(cells, x, y, columns, rows);
            if (cells[x][y]==0 && n==3) {
                cells_next[x][y] = 1;
                //console.log(n);
            } else if (cells[x][y]==1 && (n==3 || n==2)) {
                cells_next[x][y] = 1;
               // console.log(n);
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
                listOfCells[columns*y + x].style.backgroundColor = "rgba(256, 0 , 0, 1)";     

                checked[columns*y + x] = 1;
            } else {
                listOfCells[columns*y + x].style.backgroundColor = "transparent";   

                checked[columns*y + x] = 0;
            }
        }
    }
}

const launch = () => {
    if (stop) {
        gameOfLife();
        setTimeout(launch, 150);
    }   
}

/////// ХОД ПРОГРАММЫ ////////

//Считываем основные параметры




//Массив - отслеживающий состояние элементов-клеток
//Фиксированная длина 70 на 70
let checked = [];

for (let i=0; i < 70*70; i++) {
    createCell();
    checked.push(0);
}

var listOfCells = document.querySelectorAll(".board__cell");
var listOfCont = document.querySelectorAll(".board__cell-container");

for (let i=0; i<listOfCells.length; i++) {
    listOfCont[i].onclick = () => {
        if (checked[i] == 0) {
            listOfCells[i].style.backgroundColor = "rgba(256, 0 , 0, 1)";     
            checked[i] = 1; 
        } else if (checked[i] == 1) {
            listOfCells[i].style.backgroundColor = "transparent";     
            checked[i] = 0;          
        } else {
            console.log("Error");
        }
    }
}

let stop = true;
let launch_flag = true;
var button_launch = document.querySelector(".board__button-launch");
button_launch.onclick = () => {
    if (launch_flag) {
        stop = true;
        launch_flag  = false;
        button_launch.textContent = "Идет эволюция..."
        launch();
    }
}

var button_stop = document.querySelector(".board__button-stop");
button_stop.onclick = () => {
    stop = false;
    launch_flag  = true;
    button_launch.textContent = "Начни эволюцию!"
}

var button_reset = document.querySelector(".board__button-reset");
button_reset.onclick = () => {
    stop = false;
    for (let i=0; i<listOfCells.length; i++) {
        listOfCells[i].style.backgroundColor = "transparent";   
        checked[i] = 0;   
    }
}