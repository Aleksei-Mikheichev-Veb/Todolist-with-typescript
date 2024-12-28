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
    const todoList1 = v1()
    const todoList2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoList1, title: 'Study', filter: 'all'},
        {id: todoList2, title: 'Book', filter: 'active'},
    ]);
    const [tasksInTodoList, setTasksInTodoList] = useState({
        [todoList1]: [
            {id: v1(), title: 'HTML + CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
        ],
        [todoList2]: [
            {id: v1(), title: 'Ученик', isDone: false},
            {id: v1(), title: 'как закалялась сталь', isDone: false},
            {id: v1(), title: 'Внутри убийцы', isDone: true},
        ]
    })

    const changeFilterTasks = (filter: FilterType, todoListId: string) => {
        let newTodoLists = todoLists.map(list => (
            list.id == todoListId ? {...list, filter: filter} : list
        ))
        setTodoLists(newTodoLists)
    }
    const addTask = (title: string, todoListId:string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTodoList = [...tasksInTodoList[todoListId],newTask]
        setTasksInTodoList({...tasksInTodoList, [todoListId]:newTodoList })
    }


    const removeTask = (taskId: string, todoListId:string ) => {
        const resultTasks = tasksInTodoList[todoListId].filter(task => task.id !== taskId)
        setTasksInTodoList({...tasksInTodoList, [todoListId]:resultTasks })
    }

    const toggleCheckboxTask = (taskId: string, todoListId:string) => {
        const newTasks = tasksInTodoList[todoListId].map(task =>
            task.id === taskId ? {...task, isDone: !task.isDone} : task
        );
        setTasksInTodoList({...tasksInTodoList, [todoListId]: newTasks});
    };
    return (
        <div className="App">
            {todoLists.map(tl => {
                let taskToDisplay = tasksInTodoList[tl.id];
                if (tl.filter === 'active') {
                    taskToDisplay = tasksInTodoList[tl.id].filter(task => !task.isDone)
                } else if (tl.filter === 'completed') {
                    taskToDisplay = tasksInTodoList[tl.id].filter(task => task.isDone)
                }

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
