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
const sortForm = document.getElementById("sort");
let buttonState = "";
let indexEvent; // Для хранения индекса родительского при нажатии кнопки Редактировать
// Не путать taskList (массив, хранящий задачи) и listTask - список элементов HTML
const taskList = [
  {
    title: "Сегодя я проверяют",
    comment:
      "привет как дела как погода азаза мне нравятся ноги твои и глаза привет как дела как погода",
    date: "2023-08-01",
    id: Date.now() + Math.random() * 100,
    state: false,
  },
  {
    title: "Работу тудулиста",
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
    date: "2023-06-23",
    id: Date.now() + Math.random() * 100,
    state: false,
  },
  {
    title: "Быть или не быть",
    comment: "after",
    date: "2023-09-01",
    id: Date.now() + Math.random() * 100,
    state: false,
  },
  {
    title: "Акакия",
    comment: `today утром в новостях
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
    date: "2023-09-02",
    id: Date.now() + Math.random() * 100,
    state: false,
  },
  {
    title: "Да-да?",
    comment: `бывало утром в новостях
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
    date: "2022-01-01",
    id: Date.now() + Math.random() * 100,
    state: false,
  },
  {
    title: "Бывало и лучше",
    comment: `пока утром в новостях
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
    date: "2023-02-04",
    id: Date.now() + Math.random() * 100,
    state: false,
  },
  {
    title: "HEllo",
    comment: `аааа утром в новостях
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
    date: "2023-08-05",
    id: Date.now() + Math.random() * 100,
    state: false,
  },
];

sortForm.innerHTML = `<option value="new">Новые</option>
<option value="old">Старые</option>
<option value='date'>По дате</option>
<option value='title'>По названию</option>
<option value='comment'>По описанию</option>`;

renderTasks(taskList);
counterTasks(taskList);

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
   <tr><td class="buttonsStateDelete"><input type="submit"  ${buttonState} data-index="${index}" value="Выполнено" id="ready">
  <input type="reset" data-index="${index}" ${buttonState} value="Удалить" id="delete">
  <input type="button" data-index="${index}" ${buttonState} value="Редактировать" id="edit"></td></tr>
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

function buttonDisabled() {
  buttonState = "disabled";
  sortForm.disabled = true;
  addBtn.disabled = true;
  document.getElementsByClassName("sortForm")[0].style.cursor = "default";
  document.getElementsByClassName("buttonsStateDelete")[0].style.cursor =
    "default";
  document.getElementsByClassName("buttonsRightCreateTask")[0].style.cursor =
    "default";
  renderTasks(taskList);
}

function buttonEnabled() {
  buttonState = "";
  sortForm.disabled = false;
  addBtn.disabled = false;
  document.getElementsByClassName("sortForm")[0].style.cursor = "pointer";
  document.getElementsByClassName("buttonsStateDelete")[0].style.cursor =
    "pointer";
  document.getElementsByClassName("buttonsRightCreateTask")[0].style.cursor =
    "pointer";
  renderTasks(taskList);
}

function counterTasks(arrTask) {
  let readyTask = 0;
  for (let i = 0; i < arrTask.length; i++) {
    if (arrTask[i].state === true) {
      readyTask += 1;
    }
  }
  document.getElementById("counter").innerHTML = renderCounter(
    arrTask.length,
    readyTask
  );
}

function renderCounter(all, ready) {
  return `Всего задач: ${all} <br>
          Выполнено: ${ready}`;
}

sortForm.addEventListener("change", function () {
  switch (this.value) {
    case "new": {
      taskList.sort((a, b) => (a.id > b.id ? -1 : 1));
      break;
    }
    case "old": {
      taskList.sort((a, b) => (a.id > b.id ? 1 : -1));
      break;
    }
    case "date": {
      taskList.sort((a, b) => (a.date > b.date ? 1 : -1));
      break;
    }
    case "title": {
      taskList.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      );
      break;
    }
    case "comment": {
      taskList.sort((a, b) =>
        a.comment.toLowerCase() > b.comment.toLowerCase() ? 1 : -1
      );
      break;
    }
  }
  renderTasks(taskList);
});

listTask.addEventListener("click", function (event) {
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
    event.stopPropagation();
    counterTasks(taskList);
    renderTasks(taskList);
  }
});

function redactTask(index) {
  document.getElementsByClassName("redactTaskWindow")[0].style.zIndex = "2000";
  document.getElementById("titleRedact").value = taskList[index].title;
  document.getElementById("commentRedact").value = taskList[index].comment;
  document.getElementById("dateRedact").value = taskList[index].date;
  document.getElementsByClassName("mainMenu")[0].style.overflow = "hidden";
  buttonDisabled();
}

document.getElementById("cancelRedact").onclick = () => {
  document.getElementsByClassName("redactTaskWindow")[0].style.zIndex = "0";
  document.getElementsByClassName("mainMenu")[0].style.overflow = "";
  buttonEnabled();
};

document.getElementById("save").onclick = (event) => {
  if (
    document.getElementById("titleRedact").value === "" ||
    document.getElementById("dateRedact").value === ""
  ) {
    alert("Некорректный ввод данных!");
  } else {
    taskList[indexEvent].title = document.getElementById("titleRedact").value;
    taskList[indexEvent].comment =
      document.getElementById("commentRedact").value;
    taskList[indexEvent].date = document.getElementById("dateRedact").value;
    document.getElementsByClassName("redactTaskWindow")[0].style.zIndex = "0";
    buttonEnabled();
    // renderTasks(taskList)
    document.getElementsByClassName("mainMenu")[0].style.overflow = "";
  }
};

const divInputForm = document.querySelector("#inputForm");
const divEditTask = document.querySelector("#editForm");
document.addEventListener("click", (e) => {
  const withinBoundaries = e.composedPath().includes(divEditTask);
  const withinBoundaries2 = e.composedPath().includes(divInputForm);
  if (
    (!withinBoundaries &&
      document.getElementsByClassName("redactTaskWindow")[0].style.zIndex !=
        "0") ||
    (!withinBoundaries2 &&
      document.getElementsByClassName("inputForm")[0].style.zIndex != "0")
  ) {
    document.getElementsByClassName("redactTaskWindow")[0].style.zIndex = "0";
    document.getElementsByClassName("inputForm")[0].style.zIndex = "0";
    document.getElementsByClassName("mainMenu")[0].style.overflow = "";
    buttonEnabled();
    cleanInput();
  }
});

cancelBtn.onclick = () => {
  cleanInput();
  buttonEnabled();
  document.getElementsByClassName("inputForm")[0].style.zIndex = "0";
  document.getElementsByClassName("mainMenu")[0].style.overflow = "";
};

function cleanInput() {
  titleTask.value = "";
  commentTask.value = "";
  dateTask.value = "";
}

createBtn.onclick = () => {
  if (titleTask.value === "" || dateTask === "") {
    alert("Некорректный ввод данных!");
  } else {
    taskList.unshift({
      title: titleTask.value,
      comment: commentTask.value,
      date: dateTask.value,
      id: Date.now(),
      state: false,
    });
    cleanInput();
    buttonEnabled();
    // renderTasks(taskList);
    document.getElementsByClassName("inputForm")[0].style.zIndex = "0";
    document.getElementsByClassName("mainMenu")[0].style.overflow = "";
    counterTasks(taskList);
  }
};

addBtn.onclick = (event) => {
  document.getElementsByClassName("inputForm")[0].style.zIndex = "2000";
  document.getElementsByClassName("mainMenu")[0].style.overflow = "hidden";
  buttonDisabled();
  event.stopPropagation();
};
