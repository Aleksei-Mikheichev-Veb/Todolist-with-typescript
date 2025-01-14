import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string;
    title: string;
    filter: FilterType
}
export type TaskInTodoListType = {
    [key:string]: Array<TaskType>
}

function App() {
    const todoList1 = v1()
    const todoList2 = v1()
    const todoList3 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoList1, title: 'Study', filter: 'all'},
        {id: todoList2, title: 'Book', filter: 'active'},
        {id: todoList3, title: 'Мои таски', filter: 'all'},
    ]);


    const [tasksInTodoList, setTasksInTodoList] = useState<TaskInTodoListType>({
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
            {id: v1(), title: 'написать остальные функции вредусер ', isDone: false},
            {id: v1(), title: 'добавить в удаление и добавление листа, чтобы удалял и там и там ', isDone: false},
        ]
    })

    const addTodoList = (title:string) => {
        const newTask:TodoListType = {id: v1(), title: title, filter: 'all'}

        setTodoLists([ ...todoLists,newTask ])
        setTasksInTodoList({...tasksInTodoList, [newTask.id]: []})
    }
    const removeTodoList = (idTodoList:string) => {
        const newTodoLists = todoLists.filter(list => list.id !== idTodoList)
        setTodoLists(newTodoLists)
        const newTasksInTodoLists = {...tasksInTodoList}
        delete tasksInTodoList[idTodoList]
        setTasksInTodoList(newTasksInTodoLists)
    }
    const changeFilterTasks = (filter: FilterType, todoListId: string) => {
        let newTodoLists = todoLists.map(list => (
            list.id == todoListId ? {...list, filter: filter} : list
        ))
        setTodoLists(newTodoLists)
    }
    const changeTodoListTitle = (newValue:string, idTodoList:string) => {
        const newTodoLists = todoLists.map(todoList => {
            return todoList.id == idTodoList ? {...todoList,title: newValue} : todoList
        })
        setTodoLists([...newTodoLists])
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
    const changeTask = (newValue:string, idTodoList:string, idTask:string) => {
        const newTasks = tasksInTodoList[idTodoList].map(task => (
            task.id == idTask ? {...task, title:newValue} : task
        ))
        setTasksInTodoList({...tasksInTodoList,[idTodoList]: newTasks})
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

export default App;

