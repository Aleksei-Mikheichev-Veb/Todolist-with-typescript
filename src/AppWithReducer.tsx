import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC,
    todoListReducer
} from "./state/todoListReducer";
import {
    addTaskAC,
    changeTitleTaskAC,
    removeTaskAC,
    taskReducer,
    toggleCheckboxTaskAC
} from "./state/taskReducer";

export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string;
    title: string;
    filter: FilterType
}
export type TaskInTodoListType = {
    [key:string]: Array<TaskType>
}

function AppWithReducer() {
    const todoList1 = v1()
    const todoList2 = v1()
    const todoList3 = v1()
    const [todoLists, dispatchTodoListReducer] = useReducer(todoListReducer, [
        {id: todoList1, title: 'Study', filter: 'all'},
        {id: todoList2, title: 'Book', filter: 'active'},
        {id: todoList3, title: 'Мои таски', filter: 'all'},
    ]);


    const [tasksInTodoList, dispatchTaskReducer] = useReducer( taskReducer, {
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
        ],
        [todoList3]: [
            {id: v1(), title: 'Вынести добавление тасок отдельно', isDone: true},
            {id: v1(), title: 'Форма добавления todolist ', isDone: true},
            {id: v1(), title: 'чтоб в инпуте был текс при даблклике', isDone: true},
            {id: v1(), title: 'попробовать material UI', isDone: false},
            {id: v1(), title: 'написать тесты и сделать reducer ', isDone: true},
            {id: v1(), title: 'написать остальные функции вредусер ', isDone: true},
            {id: v1(), title: 'добавить в удаление и добавление листа, чтобы удалял и там и там ', isDone: true},
            {id: v1(), title: 'сделать state на usereducer ', isDone: false},
            {id: v1(), title: 'сделать state на redux  ', isDone: false},
            {id: v1(), title: 'докомпозировать app. вынестип лишнее внутрь  ', isDone: false},
        ]
    })

    const addTodoList = (title:string) => {
        const action = addTodoListAC(title)
        dispatchTodoListReducer(action)
        dispatchTaskReducer(action)
    }
    const removeTodoList = (idTodoList:string) => {
        const action = removeTodoListAC(idTodoList)
        dispatchTaskReducer(action)
        dispatchTodoListReducer(action)
    }

    const changeFilterTasks = (filter: FilterType, todoListId: string) => {
        dispatchTodoListReducer(changeFilterTodoListAC(todoListId, filter))
    }
    const changeTodoListTitle = (newValue:string, idTodoList:string) => {
        dispatchTodoListReducer(changeTitleTodoListAC(newValue,idTodoList ))
    }


    const addTask = (title: string, todoListId:string) => {
        dispatchTaskReducer(addTaskAC(title, todoListId))
    }
    const removeTask = (taskId: string, todoListId:string ) => {
        dispatchTaskReducer(removeTaskAC(taskId, todoListId))
    }
    const toggleCheckboxTask = (taskId: string, todoListId:string) => {
        dispatchTaskReducer(toggleCheckboxTaskAC(taskId, todoListId))
    };
    const changeTask = (newValue:string, idTodoList:string, idTask:string) => {
        dispatchTaskReducer(changeTitleTaskAC(newValue, idTodoList, idTask))
    }

    return (
        <div className="App">
            <AddItemForm addTask={addTodoList}/>
            <div className='todo_lists'>
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
                        removeTodoList={removeTodoList}
                        filter={tl.filter}
                        setFilterTask={changeFilterTasks}
                        changeTask={changeTask}
                        changeTodoListTitle={changeTodoListTitle}
                        removeTask={removeTask}
                        toggleCheckboxTask={toggleCheckboxTask}
                    />
                })}
            </div>

        </div>
    );
}

export default AppWithReducer;
