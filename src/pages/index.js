
//ИМПОРТ=====================================================================================================================

import '../pages/index.css';

import { Board } from '../components/Board';
import { Section } from '../components/Section';



//ФУНКЦИИ=====================================================================================================================

const handleCellClick = () => {

}

const getInfoFromBoard = () => {

}

//СКРИПТ=====================================================================================================================

//Задаем начальные состояние клеток



const board = new Board({width:10, height:10}, {handleCellClick}, '.board__space');
const boardSection = new Section(board);
console.log(board.cells);









/*
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

//Запуск эволюци... С использованием идей event loop немножечко - чтобы видеть результат каждого шага
const launch = () => {
    if (interation_goes_on) {

        cycle_flag = isCycle(states, listOfCells, rows, columns, cycle_depth);
        nochange_flag = isCycle(states, listOfCells, rows, columns, 1);

        //Если заклилась - продолжаем эволюцию, но выводим сообщеение об этом
        if (cycle_flag) {
            status_evol.textContent = "Идет эволюция..."
            status_evol.style.color = "brown";
            states = gameOfLife(states, listOfCells, rows, columns);
            setTimeout(launch, velocity);
        } else {
            status_evol.textContent = "Цикл <= "+cycle_depth;
            status_evol.style.color = "green";  

            //Если ситуация остановилась - то останавливаем
            if (nochange_flag) {
                states = gameOfLife(states, listOfCells, rows, columns);
                setTimeout(launch, velocity);
            } else {
                status_evol.textContent = "Предел (стоп)";
                status_evol.style.color = "green";      
                interation_goes_on = false;
                launch_flag  = true;
                nochange_flag = true;
            }
        }
    }   
}


//ХОД СКРИПТА

//Глобальные переменные
let rows = 70;
let columns = 70;
let cycle_depth = 2; //Глубина проверки заклинности
let states = []; //Массив состояний
let initial = []; //Для сохранения начального состояния
let velocity; //Скорость итераций

//Флаги
let interation_goes_on = false; //Истина - итерации продолжаются и не останавливаются
let launch_flag = true; //Иситна - если на клавиши запуска еще не нажимали (иначе они не сработают)
let initial_flag = true; //Истина - если не был осуществлен первый заапуск (это будет начальная расстановка)
let cycle_flag = true; //Истина - если не заклился (глубина через параметр)
let nochange_flag = true;  //Истина - если не остановилась (цикл глубиной 1)

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
        cycle_flag = true;
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
        interation_goes_on = true;
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
        interation_goes_on = true;
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
        interation_goes_on = true;
        launch_flag  = false;
        status_evol.textContent = "Идет эволюция..."
        status_evol.style.color = "brown";
        launch();
    }
}

//Кнопка - Остановка
var button_stop = document.querySelector(".board__button-stop");
button_stop.onclick = () => {
    interation_goes_on = false;
    launch_flag  = true;
    status_evol.textContent = "Начни эволюцию!";
    status_evol.style.color = "#595858";
}

//Кнопка - Сброс
var button_reset = document.querySelector(".board__button-reset");
button_reset.onclick = () => {
    interation_goes_on = false;
    launch_flag  = true;
    initial_flag = true;
    nochange_flag = true;
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
    interation_goes_on = false;
    launch_flag  = true;
    initial_flag = true;
    nochange_flag = true;
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
*/