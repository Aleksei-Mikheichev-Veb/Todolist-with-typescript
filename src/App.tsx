import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed';
type TodoListType = {
    id: string;
    title: string;
    filter: FilterType
}

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML + CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
    ])
    const [filterTask, setFilterTask] = useState<FilterType>('all')

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: v1(), title: 'Study', filter: 'all'},
        {id: v1(), title: 'Book', filter: 'active'},
    ]);

    let taskToDisplay = tasks;
    if (filterTask === 'active') {
        taskToDisplay = tasks.filter(task => !task.isDone)
    } else if (filterTask === 'completed') {
        taskToDisplay = tasks.filter(task => task.isDone)
    }

    const changeFilterTasks = (filter: FilterType, id: string) => {
        let newTodoLists = todoLists.map(list => (
            list.id == id ? {...list, filter: filter} : list
        ))
        setTodoLists(newTodoLists)
    }
    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([...tasks, newTask])
    }
    const removeTask = (id: string) => {
        const resultTasks = tasks.filter(task => task.id !== id)
        setTasks(resultTasks)
    }

    const toggleCheckboxTask = (id: string) => {
        const newTasks = tasks.map(task =>
            task.id === id ? {...task, isDone: !task.isDone} : task
        );
        setTasks(newTasks);
    };
    return (
        <div className="App">
            {todoLists.map(tl => {


                return <TodoList
                    key={tl.id}
                    title={tl.title}
                    tasks={taskToDisplay}
                    id={tl.id}
                    addTask={addTask}
                    filter={tl.filter}
                    setFilterTask={changeFilterTasks}
                    removeTask={removeTask}
                    toggleCheckboxTask={toggleCheckboxTask}
                />
            })}

        </div>
    );
}

export default App;
