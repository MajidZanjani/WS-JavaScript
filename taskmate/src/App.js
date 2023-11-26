import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { AddTask } from './components/AddTask';
import { ShowTask } from './components/ShowTask';
import './App.css';

function App() {
  const [taskList, setTaskList] = useState(
    localStorage.getItem('taskList')
      ? JSON.parse(localStorage.getItem('taskList'))
      : []
  );
  const [task, setTask] = useState({});
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div className="App">
      <Header />
      <AddTask
        taskList={taskList}
        setTaskList={setTaskList}
        task={task}
        setTask={setTask}
        dueDate={dueDate}
        setDueDate={setDueDate}
      />
      <ShowTask
        taskList={taskList}
        setTaskList={setTaskList}
        task={task}
        setTask={setTask}
        dueDate={dueDate}
        setDueDate={setDueDate}
      />
    </div>
  );
}

export default App;
