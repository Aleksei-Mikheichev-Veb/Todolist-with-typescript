import React, {useEffect} from 'react';
import './../App.css'
import {AddItemForm} from "./AddItemForm";
import EditableValue from "./EditableValue";
import {
    addTaskAC,
    changeTitleTaskAC, getTasksThunk,
    removeTaskAC,
    TaskInTodoListType,
    toggleCheckboxTaskAC
} from "../state/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    changeFilterTodoListAC,
    changeTitleTodoListAC, changeTitleTodoListThunk,
    deleteTodoListThunk,
    FilterType,
    removeTodoListAC
} from "../state/todoListReducer";
import {AppRootType} from "../state/store";
import {useActions} from "../hooks/useAction";
import TasksList from "./TasksList";

export type TaskType = {
    id:string;
    title:string;
    completed:boolean;
}

type PropsType = {
    title:string;
    id:string;
    filter:FilterType;
}

const TodoList = (props:PropsType) => {
    const {getTasksThunk, changeFilterTodoListAC,
        changeTitleTodoListThunk, changeTitleTaskAC,createNewTaskThunk, deleteTodoListThunk } = useActions()
    const tasksInTodoList = useSelector<AppRootType, Array<TaskType>>(state => {
        // console.log(state)
        return state.tasks[props.id]
    })
    // console.log('in todolist')
    let taskToDisplay = tasksInTodoList;
    if (props.filter === 'active') {
        taskToDisplay = tasksInTodoList.filter(task => !task.completed)
    } else if (props.filter === 'completed') {
        taskToDisplay = tasksInTodoList.filter(task => task.completed)
    }

    const onChangeFilterHandler = (filter:FilterType) => {
        changeFilterTodoListAC(props.id, filter)
    }

    const onClickRemoveTodoList = () => {
        deleteTodoListThunk(props.id)
    }
    const changeTodoListTitle = (newValue:string) => {
        changeTitleTodoListThunk(newValue, props.id)
    }
    const changeTask = (newValue:string, idTask:string) => {
        changeTitleTaskAC(newValue, props.id, idTask)
    }
    useEffect(() => {
        getTasksThunk(props.id)
    },[props.id])
    return (
        <section>
            <div className="title">
                <h3><EditableValue text={props.title} changeTask={changeTodoListTitle} id={props.id}/></h3>
                <button onClick={onClickRemoveTodoList}>x</button>
            </div>
            <AddItemForm addItem={(title:string) => {
                createNewTaskThunk(title, props.id)
            }}/>
            {taskToDisplay && <TasksList taskToDisplay={taskToDisplay} changeTask={changeTask} id={props.id}/>}

            <div className="buttons">
                <button className={props.filter == 'all' ? 'active_button' : ''} onClick={() => onChangeFilterHandler('all')}>All</button>
                <button className={props.filter == 'active' ? 'active_button' : ''} onClick={() => onChangeFilterHandler('active')}>Active</button>
                <button className={props.filter == 'completed' ? 'active_button' : ''} onClick={() => onChangeFilterHandler('completed')}>Completed</button>
            </div>
        </section>
    );
};

export default TodoList;


