const taskTitleField = document.getElementById('taskTitle');
const taskDescField = document.getElementById('taskDescription');
const dueDateField = document.getElementById('dueDate');
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('add');
const updateBtn = document.getElementById('update');
let task = {};
let taskId;

// localStorage.clear();
// console.log(localStorage);

function taskHTML(task) {
  return `
      <span class="label">Date:</span> <span class="task-date">${task.dueDate}</span><br>
      <span class="label">Title:</span> <span class="task-title">${task.taskTitle}</span><br>
      <span class="label">Description:</span> <span class="task-desc">${task.taskDesc}</span>
    `;
}

if (localStorage.lengh != 0) {
  Object.keys(localStorage).forEach((key) => {
    task = JSON.parse(localStorage.getItem(key));
    addTask(task);
  });
}

taskCheck = (task) => {
  return task.taskTitle !== '' && task.taskDesc !== '' && task.dueDate !== '';
};

function clearForm() {
  taskTitleField.value = '';
  taskDescField.value = '';
  dueDateField.value = '';
}

function addTask(task) {
  let newTask = document.createElement('li');
  newTask.setAttribute('id', task.taskId);
  newTask.setAttribute('onclick', `editTask(${task.taskId})`);
  newTask.classList.add('task-item'); // Add a class for styling
  // Using innerHTML to structure the task item with labeled descriptions and increased spacing

  newTask.innerHTML = taskHTML(task);
  taskList.appendChild(newTask);
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
    window.localStorage.setItem(task.taskId, JSON.stringify(task));
    clearForm();
  } else {
    alert("Please fill all the task's fields before storing it.");
  }
};

const editTask = (editableTaskId) => {
  let taskLi = document.getElementById(editableTaskId);
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

function updateTask(taskId, task) {
  const editedLi = document.getElementById(taskId);
  editedLi.innerHTML = taskHTML(task);
  window.localStorage.setItem(taskId, JSON.stringify(task));
  addBtn.classList.toggle('invisible');
  updateBtn.classList.toggle('invisible');
  clearForm();
}
