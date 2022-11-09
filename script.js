const createCell = () => {
    var board__space = document.querySelector(".board__space");
    var cell = document.createElement("div");
    cell.className='board__cell';
    board__space.appendChild(cell);
}

//Количество живых соседей
const neighbours = (array, x, y, x_length, y_length) => {
    if (x==0 && y==0) {
        return (array[x][y_length-1] + 
            array[x+1][y_length-1] + 
            array[x+1][y] + 
            array[x+1][y+1] + 
            array[x][y+1] + 
            array[x_length-1][y+1] + 
            array[x_length-1][y] + 
            array[x_length-1][y_length-1]);
    } else if (x==0 && y==y_length-1) {
        return (array[x][y-1] + 
            array[x+1][y-1] + 
            array[x+1][y] + 
            array[x+1][0] + 
            array[x][0] + 
            array[x_length-1][0] + 
            array[x_length-1][y] + 
            array[x_length-1][y-1]);            
    } else if (x==x_length-1 && y==0) {
        return (array[x][y_length-1] + 
            array[0][y_length-1] + 
            array[0][y] + 
            array[0][y+1] + 
            array[x][y+1] + 
            array[x-1][y+1] + 
            array[x-1][y] + 
            array[x-1][y_length-1]);
    } else if (x==x_length-1 && y==y_length-1) {
        return (array[x][y-1] + 
            array[0][y-1] + 
            array[0][y] + 
            array[0][0] + 
            array[x][0] + 
            array[x-1][0] + 
            array[x-1][y] + 
            array[x-1][y-1]);
    } else if (x==0) {
        return (array[x][y-1] + 
            array[x+1][y-1] + 
            array[x+1][y] + 
            array[x+1][y+1] + 
            array[x][y+1] + 
            array[x_length-1][y+1] + 
            array[x_length-1][y] + 
            array[x_length-1][y-1]);       
    } else if (y==0) {
        return (array[x][y_length-1] + 
            array[x+1][y_length-1] + 
            array[x+1][y] + 
            array[x+1][y+1] + 
            array[x][y+1] + 
            array[x-1][y+1] + 
            array[x-1][y] + 
            array[x-1][y_length-1]);     
    } else if (y == y_length-1) {
        return (array[x][y-1] + 
            array[x+1][y-1] + 
            array[x+1][y] + 
            array[x+1][0] + 
            array[x][0] + 
            array[x-1][0] + 
            array[x-1][y] + 
            array[x-1][y-1]);   
    } else if (x == x_length-1) {
        return (array[x][y-1] + 
            array[0][y-1] + 
            array[0][y] + 
            array[0][y+1] + 
            array[x][y+1] + 
            array[x-1][y+1] + 
            array[x-1][y] + 
            array[x-1][y-1]);
    } else {
        return (array[x][y-1] + 
            array[x+1][y-1] + 
            array[x+1][y] + 
            array[x+1][y+1] + 
            array[x][y+1] + 
            array[x-1][y+1] + 
            array[x-1][y] + 
            array[x-1][y-1]);
    }
}

//Игра жизни
const gameOfLife = () => {

    //Переводим массив в двумерный
    let x_length = Math.sqrt(checked.length);
    let y_length = Math.sqrt(checked.length);
    let cells = new Array(x_length);
    let cells_next = new Array(x_length);

    for (let i = 0; i<x_length; i++) {
        cells[i] = new Array(y_length);
        cells_next[i] = new Array(y_length);
    }

    for (let x=0; x<x_length; x++) {
        for (let y=0; y<y_length; y++) {
            cells[x][y] = checked[y_length*y + x];
            cells_next[x][y] = 0;
        }
    }

    //запускаем игру - расчет след состояния
    for(let i=0; i<100; i++) {
        setTimeout(function () { }, 1000);

        for (let x=0; x<x_length; x++) {
            for (let y=0; y<y_length; y++) {
                let n = neighbours(cells, x, y, x_length, y_length);
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
        for (let x=0; x<x_length; x++) {
            for (let y=0; y<y_length; y++) {
                cells[x][y] = cells_next[x][y];
                cells_next[x][y] = 0;

                if (cells[x][y] == 1) {
                    listOfCells[y_length*y+x].style.backgroundColor = "rgba(256, 0 , 0, 0.5)";     
                    listOfCells[y_length*y+x].style.border = "1px solid rgba(256, 0 , 0, 1)";  
                } else {
                    listOfCells[y_length*y+x].style.backgroundColor = "transparent";   
                    listOfCells[y_length*y+x].style.border = "1px solid rgba(256, 0 , 0, .1)";
                }
            }
        }
    }
}



/////// ХОД ПРОГРАММЫ ////////

//Массив - отслеживающий состояние элементов-клеток
//Фиксированная длина 70 на 70
let checked = [];

for (let i=0; i < 70*70; i++) {
    createCell();
    checked.push(0);
}

var listOfCells = document.querySelectorAll(".board__cell");

for (let i=0; i<listOfCells.length; i++) {
    listOfCells[i].onclick = () => {
        if (checked[i] == 0) {
            listOfCells[i].style.backgroundColor = "rgba(256, 0 , 0, 0.5)";     
            listOfCells[i].style.border = "1px solid rgba(256, 0 , 0, 1)";   
            checked[i] = 1; 
        } else if (checked[i] == 1) {
            listOfCells[i].style.backgroundColor = "transparent";   
            listOfCells[i].style.border = "1px solid rgba(256, 0 , 0, .1)";    
            checked[i] = 0;          
        } else {
            console.log("Error");
        }
    }
}

var button = document.querySelector(".board__button");
button.onclick = gameOfLife;