import { TimeFormatter } from './TimeFormatter';

export const AddTask = ({
  taskList,
  setTaskList,
  task,
  setTask,
  dueDate,
  setDueDate,
}) => {
  let tempD;
  if (task.dueDate) {
    tempD = TimeFormatter(task.dueDate);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const idTime = new Date();
    if (tempD) {
      const date = TimeFormatter(dueDate);
      const updatedTaskList = taskList.map((todo) =>
        todo.id === task.id
          ? { id: task.id, name: task.name, dueDate: date }
          : todo
      );
      setTaskList(updatedTaskList);
      setTask({});
      setDueDate('');
    } else {
      const date = TimeFormatter(e.target.dueDate.value);
      const newTask = {
        id: idTime.getTime(),
        name: e.target.task.value,
        dueDate: date,
      };
      setTaskList([...taskList, newTask]);
      setTask({});
      setDueDate('');
    }
  };

  return (
    <section className="addTask">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          autoComplete="off"
          placeholder="add task"
          maxLength="25"
          value={task.name || ''}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
        <input
          type="datetime-local"
          name="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </section>
  );
};
