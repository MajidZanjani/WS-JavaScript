import { TimeFormatter } from './TimeFormatter';

export const AddTask = ({
  taskList,
  setTaskList,
  task,
  setTask,
  dueDate,
  setDueDate,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const idTime = new Date();
    const date = TimeFormatter(e.target.dueDate.value);

    const newTask = {
      id: idTime.getTime(),
      name: e.target.task.value,
      dueDate: date,
    };
    setTaskList([...taskList, newTask]);
    e.target.dueDate.value = '';
    e.target.task.value = '';
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
          value={task.name}
        />
        <input type="datetime-local" name="dueDate" value={task.dueDate} />
        <button type="submit">Add</button>
      </form>
    </section>
  );
};
