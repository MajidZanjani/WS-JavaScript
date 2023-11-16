const taskTitleField = document.getElementById('taskTitle');
const taskDescField = document.getElementById('taskDescription');
const dueDateField = document.getElementById('dueDate');
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('add');
const updateBtn = document.getElementById('update');
let task = {};
let taskId;

function appRestart() {
  const restartConfirm = confirm('Do you realy want to clear all the tasks?!');
  if (restartConfirm) {
    localStorage.clear();
    location.reload();
  }
}

// console.log(localStorage);

function taskHTML(task) {
  return `
      <span class="label">Date:</span> <span class="task-date">${task.dueDate}</span><br>
      <span class="label">Title:</span> <span class="task-title">${task.taskTitle}</span><br>
      <span class="label">Description:</span> <span class="task-desc">${task.taskDesc}</span>
    `;
}

function clearForm() {
  taskTitleField.value = '';
  taskDescField.value = '';
  dueDateField.value = '';
  taskTitleField.focus();
}

function addTask(task) {
  const newTask = document.createElement('li');
  newTask.setAttribute('id', task.taskId);
  newTask.setAttribute('onclick', `editTask(${task.taskId})`);
  newTask.classList.add('task-item'); // Add a class for styling
  // Using innerHTML to structure the task item with labeled descriptions and increased spacing
  newTask.innerHTML = taskHTML(task);
  taskList.appendChild(newTask);
}

function updateTask(taskId, task) {
  const editedLi = document.getElementById(taskId);
  editedLi.innerHTML = taskHTML(task);
  localStorage.setItem(taskId, JSON.stringify(task));
  addBtn.classList.toggle('invisible');
  updateBtn.classList.toggle('invisible');
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
