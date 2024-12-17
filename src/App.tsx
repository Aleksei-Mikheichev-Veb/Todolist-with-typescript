import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";

export type FilterType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id:1, title: 'HTML + CSS', isDone: true},
        {id:2, title: 'JS', isDone: true},
        {id:3, title: 'React', isDone: false},
        {id:4, title: 'Typescript', isDone: false},
    ])
    const [filterTask, setFilterTask] = useState<FilterType>('all')

    let taskToDisplay = tasks;
    if(filterTask === 'active'){
        taskToDisplay = tasks.filter(task => task.isDone)
    }else if(filterTask === 'completed'){
        taskToDisplay = tasks.filter(task => !task.isDone)
    }
    // const addTask = (title:string) => {
    //     const newTask = {id:5, title:title, isDone:false}
    // }
    const removeTask = (id:number) => {
        const resultTask = tasks.filter(task => task.id !== id)
        setTasks(resultTask)
    }

  return (
    <div className="App">
      <TodoList title={'Study'}
                tasks={taskToDisplay}
                // addTask={addTask}
                setFilterTask={setFilterTask}
                removeTask={removeTask}/>
    </div>
  );
}

export default App;
