import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id:v1(), title: 'HTML + CSS', isDone: true},
        {id:v1(), title: 'JS', isDone: true},
        {id:v1(), title: 'React', isDone: false},
        {id:v1(), title: 'Typescript', isDone: false},
    ])
    const [filterTask, setFilterTask] = useState<FilterType>('all')

    let taskToDisplay = tasks;
    if(filterTask === 'active'){
        taskToDisplay = tasks.filter(task => task.isDone)
    }else if(filterTask === 'completed'){
        taskToDisplay = tasks.filter(task => !task.isDone)
    }
    const addTask = (title:string) => {
        const newTask = {id:v1(), title:title, isDone:false}
        setTasks([...tasks, newTask])
    }
    const removeTask = (id:string) => {
        const resultTask = tasks.filter(task => task.id !== id)
        setTasks(resultTask)
    }

  return (
    <div className="App">
      <TodoList title={'Study'}
                tasks={taskToDisplay}
                addTask={addTask}
                setFilterTask={setFilterTask}
                removeTask={removeTask}/>
    </div>
  );
}

export default App;
