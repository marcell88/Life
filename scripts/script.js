//ФУНКЦИИ
//Строим одну ячейку
const createCell = () => {
    var board__space = document.querySelector(".board__space");
    var cell_container = document.createElement("div");
    var cell = document.createElement("div");
    cell_container.className='board__cell-container';
    cell.className='board__cell';
    board__space.appendChild(cell_container);
    cell_container.appendChild(cell);    
}

//Запуск эволюци...
const launch = () => {
    if (stop) {
        states = gameOfLife(states, listOfCells, rows, columns);
        setTimeout(launch, velocity);
    }   
}


//ХОД СКРИПТА

//Глобальные переменные
let rows = 70;
let columns = 70;
let states = []; //Массив состояний
let initial = []; //Для сохранения начального состояния
let stop = true; //Остановка итераций
let launch_flag = true; //Флаг - если истина то кнопки запуска сработают, иначе - не будут реагировать
let initial_flag = true; //Истина до первого запуска - это будет начальная расстановка
let velocity; //Скорость итераций

//Отстраиваем поле
var board__space = document.querySelector(".board__space");
board__space.style.height = rows*10+"px";
board__space.style.width = columns*10+"px";
for (let y=0; y<columns; y++) {
    for (let x=0; x<rows; x++) {
        createCell();
        states.push(0);
        initial.push(0);
    }
}

//Блок для обработки выставления точек на поле
var listOfCells = document.querySelectorAll(".board__cell");
var listOfCont = document.querySelectorAll(".board__cell-container");
for (let i=0; i<listOfCells.length; i++) {
    listOfCont[i].onclick = () => {
        if (states[i] == 0) {
            listOfCells[i].style.backgroundColor = "rgba(256, 0 , 0, 1)";     
            states[i] = 1; 
        } else if (states[i] == 1) {
            listOfCells[i].style.backgroundColor = "transparent";     
            states[i] = 0;          
        } else {
            console.log("Error");
        }
    }
}


//Переменная для вывода статуса
var status_evol = document.querySelector(".board__status");

//Кнопка - Запуск на нормальной скорости
var button_norm = document.querySelector(".board__button-norm");
button_norm.onclick = () => {
    velocity = 200;
    if (initial_flag) {
        initial_flag = false;
        for (let i=0; i<columns*rows; i++) {
            initial[i] = states[i];
        }
    }
    if (launch_flag) {
        stop = true;
        launch_flag  = false;
        status_evol.textContent = "Идет эволюция...";
        status_evol.style.color = "brown";
        launch();
    }
}

//Кнопка - Запуск на двойной скорости
var button_double = document.querySelector(".board__button-double");
button_double.onclick = () => {
    velocity = 100;
    if (initial_flag) {
        initial_flag = false;
        for (let i=0; i<columns*rows; i++) {
            initial[i] = states[i];
        }
    }
    if (launch_flag) {
        stop = true;
        launch_flag  = false;
        status_evol.textContent = "Идет эволюция..."
        status_evol.style.color = "brown";
        launch();
    }
}

//Кнопка - Запуск на четверной скорости
var button_max = document.querySelector(".board__button-max");
button_max.onclick = () => {
    velocity = 50;
    if (initial_flag) {
        initial_flag = false;
        for (let i=0; i<columns*rows; i++) {
            initial[i] = states[i];
        }
    }
    if (launch_flag) {
        stop = true;
        launch_flag  = false;
        status_evol.textContent = "Идет эволюция..."
        status_evol.style.color = "brown";
        launch();
    }
}

//Кнопка - Остановка
var button_stop = document.querySelector(".board__button-stop");
button_stop.onclick = () => {
    stop = false;
    launch_flag  = true;
    status_evol.textContent = "Начни эволюцию!";
    status_evol.style.color = "#595858";
}

//Кнопка - Сброс
var button_reset = document.querySelector(".board__button-reset");
button_reset.onclick = () => {
    stop = false;
    launch_flag  = true;
    initial_flag = true;
    for (let i=0; i<listOfCells.length; i++) {
        listOfCells[i].style.backgroundColor = "transparent";   
        states[i] = 0;   
    }
    status_evol.textContent = "Начни эволюцию!";
    status_evol.style.color = "#595858";
}

//Кнопка - Сначала
var button_initial = document.querySelector(".board__button-initial");
button_initial.onclick = () => {
    stop = false;
    launch_flag  = true;
    initial_flag = true;
    states = initial;
    for (let i=0; i<rows*columns; i++) {
        if (states[i] == 1) {
            listOfCells[i].style.backgroundColor = "rgba(256, 0 , 0, 1)";     
        } else {
            listOfCells[i].style.backgroundColor = "transparent";   
        }
    }
    status_evol.textContent = "Начни эволюцию!";
    status_evol.style.color = "#595858";
}