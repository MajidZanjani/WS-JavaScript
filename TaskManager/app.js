const taskTitleField = document.getElementById('taskTitle');
const taskDescField = document.getElementById('taskDescription');
const dueDateField = document.getElementById('dueDate');
const taskList = document.getElementById('taskList');
let task = {};

// localStorage.clear();
// console.log(localStorage);

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
  newTask.innerHTML = `
      <span class="label">Date:</span> <span class="task-date">${task.dueDate}</span><br>
      <span class="label">Title:</span> <span class="task-title">${task.taskTitle}</span><br>
      <span class="label">Description:</span> <span class="task-desc">${task.taskDesc}</span>
    `;
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
    // clearForm();
  } else {
    alert("Please fill all the task's fields before storing it.");
  }
};

const editTask = (taskId) => {
  let taskLi = document.getElementById(taskId);
  taskTitleField.value = '';
  taskDescField.value = '';
  dueDateField.value = '';
  console.log(taskLi);
};
