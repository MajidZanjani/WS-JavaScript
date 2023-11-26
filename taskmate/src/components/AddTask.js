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
    if (task.name) {
      const idTime = new Date();
      //Editing an existing Task
      if (tempD) {
        const date = dueDate
          ? TimeFormatter(dueDate)
          : TimeFormatter(TimeFormatter(idTime));
        const updatedTaskList = taskList.map((todo) =>
          todo.id === task.id
            ? { id: task.id, name: task.name, dueDate: date }
            : todo
        );
        setTaskList(updatedTaskList);
        setTask({});
        setDueDate('');
      } //Adding new Task
      else {
        const date = e.target.dueDate.value
          ? TimeFormatter(e.target.dueDate.value)
          : TimeFormatter(TimeFormatter(idTime));
        const newTask = {
          id: idTime.getTime(),
          name: e.target.task.value,
          dueDate: date,
        };
        setTaskList([...taskList, newTask]);
        setTask({});
        setDueDate('');
      }
    } else {
      alert('Please fill the task description.');
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
        <button type="submit">{task.id ? 'Update' : 'Add'}</button>
      </form>
    </section>
  );
};
