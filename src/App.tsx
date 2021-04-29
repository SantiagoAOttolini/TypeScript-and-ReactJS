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
  const addTask = (name: string): void => {
    //Copy the new content of tasks and add a new one
    const newTasks: ITask[] = [...tasks, { name: name, done: false }];
    setTask(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    //copy in a new variable the actual value of the task inside the state
    const newTasks: ITask[] = [...tasks];
    /*
    if of all the tasks I have a task with value 
    true it is changed to false and the list with the object changes*/
    newTasks[i].done = !newTasks[i].done;
    setTask(newTasks);
  };

  const removeTask = (i: number): void =>{
    const newTasks: ITask[] = [...tasks]
    /*of all the tasks I delete a task with the index that they pass me by parameter*/
    newTasks.splice(i, 1)
    setTask(newTasks)
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(i)}
                >
                  {t.done ? "✓" : "✗"}
                </button>
                <button className="btn btn-danger" onClick = {()=> removeTask(i)}>
                🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
