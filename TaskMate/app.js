const taskTitleField = document.getElementById('taskTitle');
const taskDescField = document.getElementById('taskDescription');
const dueDateField = document.getElementById('dueDate');
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('add');
const updateBtn = document.getElementById('update');
const resetBtn = document.getElementById('reset');
const eraseBtn = document.getElementById('erase');
let task = {};
let taskId;

function appRestart() {
  const restartConfirm = confirm('Do you realy want to clear all the tasks?!');
  if (restartConfirm) {
    localStorage.clear();
    location.reload();
  }
}

function taskErase() {
  const eraseConfirm = confirm('Do you realy want to remove this task?');
  if (eraseConfirm) {
    document.getElementById(taskId).remove();
    localStorage.removeItem(taskId);
    clearForm();
  }
}

function taskHTML(task) {
  return `
      <span class="label">Date:&nbsp</span> <span class="task-date">${task.dueDate}</span><br>
      <span class="label">Title:&nbsp</span> <span class="task-title">${task.taskTitle}</span><br>
      <span class="label">Description:&nbsp</span> <span class="task-desc">${task.taskDesc}</span>
    `;
}

function clearForm() {
  taskTitleField.value = '';
  taskDescField.value = '';
  dueDateField.value = '';
  if (addBtn.classList.contains('invisible')) {
    addBtn.classList.toggle('invisible');
    updateBtn.classList.toggle('invisible');
    eraseBtn.classList.toggle('invisible');
    resetBtn.classList.toggle('invisible');
  }
  taskTitleField.focus();
}

function addTask(task) {
  const newTask = document.createElement('li');
  newTask.setAttribute('id', task.taskId);
  newTask.setAttribute('onclick', `editTask(${task.taskId})`);
  newTask.classList.add('task-item');
  newTask.innerHTML = taskHTML(task);
  taskList.appendChild(newTask);
}

function updateTask(taskId, task) {
  const editedLi = document.getElementById(taskId);
  editedLi.innerHTML = taskHTML(task);
  localStorage.setItem(taskId, JSON.stringify(task));
  clearForm();
}

const addTaskHandler = () => {
  task = {
    taskId: Math.floor(Math.random() * 10000),
    taskTitle: taskTitleField.value,
    taskDesc: taskDescField.value,
    dueDate: dueDateField.value,
  };
  if (taskCheck(task)) {
    addTask(task);
    localStorage.setItem(task.taskId, JSON.stringify(task));
    clearForm();
  } else {
    alert("Please fill all the task's fields before storing it.");
  }
};

const updateTaskHandler = () => {
  task = {
    taskId: taskId,
    taskTitle: taskTitleField.value,
    taskDesc: taskDescField.value,
    dueDate: dueDateField.value,
  };
  if (taskCheck(task)) {
    updateTask(taskId, task);
  } else {
    alert("Please fill all the task's fields before storing it.");
  }
};

const editTask = (editableTaskId) => {
  const taskLi = document.getElementById(editableTaskId);
  taskTitleField.value =
    taskLi.getElementsByClassName('task-title')[0].innerText;
  taskDescField.value = taskLi.getElementsByClassName('task-desc')[0].innerText;
  dueDateField.value = taskLi.getElementsByClassName('task-date')[0].innerText;
  taskId = editableTaskId;
  if (addBtn.classList.contains('invisible')) {
  } else {
    addBtn.classList.toggle('invisible');
    updateBtn.classList.toggle('invisible');
    eraseBtn.classList.toggle('invisible');
    resetBtn.classList.toggle('invisible');
  }
};

if (localStorage.lengh != 0) {
  Object.keys(localStorage).forEach((key) => {
    task = JSON.parse(localStorage.getItem(key));
    addTask(task);
  });
}

taskCheck = (task) => {
  return task.taskTitle !== '' && task.taskDesc !== '' && task.dueDate !== '';
};

taskTitleField.focus();
