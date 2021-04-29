import React, { useState } from "react";

//That element comes to React component and are refers to HTML
type formElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

//Return an element
function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  //List of task
  const [tasks, setTask] = useState<ITask[]>([]);

  const handleSubmit = (e: formElement) => {
    e.preventDefault();
    addTask(newTask);
    //When i send a data, clean the input
    setNewTask("");
  };

  //Recive a name of a new task
  const addTask = (name: string) => {
    //Copy the new content of tasks and add a new one
    const newTasks: ITask[] = [...tasks, { name: name, done: false }];
    setTask(newTasks);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <button>Save</button>
      </form>
      {tasks.map((t: ITask, i: number) => {
        return <h1 key={i}>{t.name}</h1>;
      })}
    </div>
  );
}

export default App;
