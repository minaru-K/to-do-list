//ДЛЯ ПЕРЕПИСЫВАНИЯ ФУНКЦИОНАЛА ПОД МОДАЛЬНЫЕ ОКНА

/*
To Do List будет состоять из страницы, где выводится список текущих задач. Если задач нет, пишем "Все задачи выполнены".
Под надписью будет располагаться кнопка "Добавить задачу". Она открывает поле с вводом данных для задачи: 
1. Заголовок
2. Комментарий (необязательно)
3. Дата/дедлайн
Внизу две кнопки: Подтвердить и Отмена
После подтверждения, окно закрывается, а на главной странице приложения появляется задача с обратным отсчётом. 
Так же идет подсчёт количества текущих задач (всего и выполнено).
Рядом с кратким описанием задачи будут две кнопки: Выполнено (галочка) и Удалить (корзина)
При нажатии на заголовок задчи, раскрывается окно с описанием задачи и теми же кнопками, только внизу окна.
*/

const titleTask = document.getElementById("title");
const commentTask = document.getElementById("comment");
const dateTask = document.getElementById("date");
const listTask = document.getElementById("list");
const createBtn = document.getElementById("create");
const cancelBtn = document.getElementById("cancel");
const addBtn = document.getElementById("add");
const inputForm = document.getElementById('inputForm')

// Не путать taskList (массив, хранящий задачи) и listTask - список элементов HTML
const taskList = [];

// renderTasks(taskList);
// //syncJson()
// let tasksJson
// function syncToJson() {
//   tasksJson = JSON.stringify(taskList)
//   console.log('таска', tasksJson)
// }

// function syncToTaskList() {
//   //Основная проблема - у js нет доступа к ФС пользователя. Я не могу сохранить файл json в системе и подхватить данные из него
// }

function renderTasks(arrTask) {
  listTask.innerHTML = "";
  //console.log("Массив", arrTask);
  if (arrTask.length !== 0) {
    for (let i in arrTask) {
      listTask.insertAdjacentHTML("beforeend", getTaskList(arrTask[i], i));
    }
  } else {
    listTask.innerHTML = "Нет задач!";
  }
}

function getTaskList(arrTask, index) {
  return `
    <li><div>${
      arrTask.state === true ? arrTask.title.strike() : arrTask.title
    }<br>
    Описание: ${arrTask.comment}<br>
    Срок выполнения: ${arrTask.date}<br>
    Статуc: ${arrTask.state === false ? "Не выполнено" : "Выполнено"}<br>
    <p><input type="submit" data-index="${index}" value="Выполнено">
    <input type="reset" data-index="${index}" value="Удалить"></p>
    </div>
    </li>
  `; // попробовать кнопки переместить справа от задачи
}

listTask.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.type;
    if (type === "submit") {
      taskList[index].state = !taskList[index].state;
    } else if (type === "reset") {
      taskList.splice(index, 1);
    }
    renderTasks(taskList);
  }
};

// Разобраться позже, необходимо по нажатию очистить все поля для ввода данных
cancelBtn.onclick = () => {
  cleanInput();
  document.getElementsByClassName('inputForm')[0].style = "z-index: 0";
};

function cleanInput() {
  titleTask.value = "";
  commentTask.value = "";
  dateTask.value = "";
}

createBtn.onclick = () => {
  taskList.push({
    title: titleTask.value,
    comment: commentTask.value,
    date: dateTask.value,
    id: Date.now(),
    state: false,
  });
  cleanInput();
  renderTasks(taskList);
  //inputForm.classList.remove("layer2")
  //inputForm.classList.add("setDisplay")
  document.getElementsByClassName('inputForm')[0].style = "z-index: 0";
  //syncJson()
};

addBtn.onclick = () => {
    //inputForm.classList.remove("setDisplay")
    inputForm.classList.add("layer2")
    document.getElementsByClassName('inputForm')[0].style = "z-index: 2000";
};
