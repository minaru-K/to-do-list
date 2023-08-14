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
const inputForm = document.getElementById("inputForm");
let indexEvent; // Для хранения индекса родительского при нажатии кнопки Редактировать
// Не путать taskList (массив, хранящий задачи) и listTask - список элементов HTML
const taskList = [
  {
    title:
      "fffffffffffffjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjfffffffffffffffffffffffffffffffggggggg hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    comment:
      "привет как дела как погода азаза мне нравятся ноги твои и глаза привет как дела как погода",
    date: dateTask.value,
    id: Date.now(),
    state: false,
  },
  {
    title:
      "Какой-то бессмысленный набор слов, необходимый для проверки переноса текста, да-да",
    comment: `Сегодня утром в новостях
    Плясали танцы на костях,
    Ругались матом при гостях.
    А пару выпусков спустя
    Ещё одна винишко-тян
    Стала кислотницей пустяк.
    Падают звезды, ах поймать бы хоть одну!
    Бомбы-ракеты летят не знаю куда откуда...
    Я хочу сделать настоящее тату,
    Я посвящу его женщине из клуба.
    Я хочу велосипед и чистой футболкой
    Падать-падать-падать,
    Падать в грязь, падать в грязь!`,
    date: dateTask.value,
    id: Date.now(),
    state: false,
  },
  {
    title: "Короткий набор текста",
    comment: "",
    date: dateTask.value,
    id: Date.now(),
    state: false,
  },
  {
    title:
      "Какой-то бессмысленный набор слов, необходимый для проверки переноса текста, да-да",
    comment: `Сегодня утром в новостях
    Плясали танцы на костях,
    Ругались матом при гостях.
    А пару выпусков спустя
    Ещё одна винишко-тян
    Стала кислотницей пустяк.
    Падают звезды, ах поймать бы хоть одну!
    Бомбы-ракеты летят не знаю куда откуда...
    Я хочу сделать настоящее тату,
    Я посвящу его женщине из клуба.
    Я хочу велосипед и чистой футболкой
    Падать-падать-падать,
    Падать в грязь, падать в грязь!`,
    date: dateTask.value,
    id: Date.now(),
    state: false,
  },
  {
    title:
      "Какой-то бессмысленный набор слов, необходимый для проверки переноса текста, да-да",
    comment: `Сегодня утром в новостях
    Плясали танцы на костях,
    Ругались матом при гостях.
    А пару выпусков спустя
    Ещё одна винишко-тян
    Стала кислотницей пустяк.
    Падают звезды, ах поймать бы хоть одну!
    Бомбы-ракеты летят не знаю куда откуда...
    Я хочу сделать настоящее тату,
    Я посвящу его женщине из клуба.
    Я хочу велосипед и чистой футболкой
    Падать-падать-падать,
    Падать в грязь, падать в грязь!`,
    date: dateTask.value,
    id: Date.now(),
    state: false,
  },
  {
    title: 111111,
    comment: `Сегодня утром в новостях
    Плясали танцы на костях,
    Ругались матом при гостях.
    А пару выпусков спустя
    Ещё одна винишко-тян
    Стала кислотницей пустяк.
    Падают звезды, ах поймать бы хоть одну!
    Бомбы-ракеты летят не знаю куда откуда...
    Я хочу сделать настоящее тату,
    Я посвящу его женщине из клуба.
    Я хочу велосипед и чистой футболкой
    Падать-падать-падать,
    Падать в грязь, падать в грязь!`,
    date: dateTask.value,
    id: Date.now(),
    state: false,
  },
  {
    title: 111111,
    comment: `Сегодня утром в новостях
    Плясали танцы на костях,
    Ругались матом при гостях.
    А пару выпусков спустя
    Ещё одна винишко-тян
    Стала кислотницей пустяк.
    Падают звезды, ах поймать бы хоть одну!
    Бомбы-ракеты летят не знаю куда откуда...
    Я хочу сделать настоящее тату,
    Я посвящу его женщине из клуба.
    Я хочу велосипед и чистой футболкой
    Падать-падать-падать,
    Падать в грязь, падать в грязь!`,
    date: dateTask.value,
    id: Date.now(),
    state: false,
  },
];

renderTasks(taskList);
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
  if (arrTask.length !== 0) {
    for (let i in arrTask) {
      listTask.insertAdjacentHTML("beforeend", getTaskList(arrTask[i], i));
    }
  } else {
    listTask.innerHTML = "<p class='noTasks'>Нет задач!</p>";
  }
}

function textDecoration(string, state) {
  if (state === true) {
    return `<s>${string}</s>`;
  } else if (state === false) {
    return string;
  }
}

function getTaskList(arrTask, index) {
  return `<tbody class="listTBody"><tr><td><div><b>${textDecoration(
    arrTask.title,
    arrTask.state
  )}</div></td></tr></b>
  <tr>
    <td><div>Описание: ${arrTask.comment}</div></td>
  </tr>
  <tr>
    <td>Срок выполнения: ${arrTask.date}</td>
  </tr>
  <tr>
    <td>Статуc: ${arrTask.state === false ? "Не выполнено" : "Выполнено"}</td>
  </tr>
   <tr><td class="buttonsStateDelete"><input type="submit" data-index="${index}" value="Выполнено">
  <input type="reset" data-index="${index}" value="Удалить">
  <input type="button" data-index="${index}" value="Редактировать"></td></tr>
  </tbody> <br>`;
  // `<li>${
  //   arrTask.state === true ? document.getElementsByClassName("taskList")[0].style = "text-decoration: line-through;" :  document.getElementsByClassName("taskList")[0].style = "text-decoration: '';"
  // }<br>
  // Описание: ${arrTask.comment}<br>
  // Срок выполнения: ${arrTask.date}<br>
  // Статуc: ${arrTask.state === false ? "Не выполнено" : "Выполнено"}<br>
  // <p><input type="submit" data-index="${index}" value="Выполнено">
  // <input type="reset" data-index="${index}" value="Удалить"></p>
  // </li>`;
  // при использовании старого зачеркивания текста ломается показ списка

  // return `<tr><td>${
  //   textDecoration(arrTask)
  // }</td></tr><br>
  // <tr>
  //   <td>Описание:</td> <td>${arrTask.comment}</td><br>
  // </tr>
  // <tr>
  //   <td>Срок выполнения:</td> <td>${arrTask.date}</td><br>
  // </tr>
  // <tr>
  //   <td>Статуc:</td> <td>${
  //     arrTask.state === false ? "Не выполнено" : "Выполнено"
  //   }</td><br>
  // </tr>
  //   <tr><p><input type="submit" data-index="${index}" value="Выполнено">
  // <input type="reset" data-index="${index}" value="Удалить"></p>
  // </tr>`;
}

listTask.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.type;
    if (type === "submit") {
      taskList[index].state = !taskList[index].state;
    } else if (type === "reset") {
      taskList.splice(index, 1);
    } else if (type === "button") {
      redactTask(index);
      indexEvent = index;
    }
    renderTasks(taskList);
  }
};

function redactTask(index) {
  document.getElementsByClassName("redactTaskWindow")[0].style =
    "z-index: 3000";
  document.getElementById("titleRedact").value = taskList[index].title;
  document.getElementById("commentRedact").value = taskList[index].comment;
  document.getElementById("dateRedact").value = taskList[index].date;
}

document.getElementById("cancelRedact").onclick = () => {
  document.getElementsByClassName("redactTaskWindow")[0].style = "z-index: 0";
};

document.getElementById("save").onclick = (event) => {
  taskList[indexEvent].title = document.getElementById("titleRedact").value;
  taskList[indexEvent].comment = document.getElementById("commentRedact").value;
  taskList[indexEvent].date = document.getElementById("dateRedact").value;
  document.getElementsByClassName("redactTaskWindow")[0].style = "z-index: 0";
  renderTasks(taskList);
};

cancelBtn.onclick = () => {
  cleanInput();
  document.getElementsByClassName("inputForm")[0].style = "z-index: 0";
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
  document.getElementsByClassName("inputForm")[0].style = "z-index: 0";
  //syncJson()
};

addBtn.onclick = () => {
  document.getElementsByClassName("inputForm")[0].style = "z-index: 2000";
};
