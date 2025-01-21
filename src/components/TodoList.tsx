import React from 'react';
import './../App.css'
import {AddItemForm} from "./AddItemForm";
import EditableValue from "./EditableValue";
import {
    addTaskAC,
    changeTitleTaskAC,
    removeTaskAC,
    TaskInTodoListType,
    toggleCheckboxTaskAC
} from "../state/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {changeFilterTodoListAC, changeTitleTodoListAC, FilterType, removeTodoListAC} from "../state/todoListReducer";
import {AppRootType} from "../state/store";

export type TaskType = {
    id:string;
    title:string;
    isDone:boolean;
}

type PropsType = {
    title:string;
    id:string;
    filter:FilterType;
}

const TodoList = (props:PropsType) => {
    const dispatch = useDispatch()
    const tasksInTodoList = useSelector<AppRootType, Array<TaskType>>(state => state.tasks[props.id])

    let taskToDisplay = tasksInTodoList;
    if (props.filter === 'active') {
        taskToDisplay = tasksInTodoList.filter(task => !task.isDone)
    } else if (props.filter === 'completed') {
        taskToDisplay = tasksInTodoList.filter(task => task.isDone)
    }

    const onChangeFilterHandler = (filter:FilterType) => {
        dispatch(changeFilterTodoListAC(props.id, filter))
    }

    const onClickRemoveTodoList = () => {
        dispatch(removeTodoListAC(props.id))
    }
    const changeTodoListTitle = (newValue:string) => {
        dispatch(changeTitleTodoListAC(newValue, props.id))
    }
    const changeTask = (newValue:string, idTask:string) => {
        dispatch(changeTitleTaskAC(newValue, props.id, idTask))
    }
    return (
        <section>
            <div className="title">
                <h3><EditableValue text={props.title} changeTask={changeTodoListTitle} id={props.id}/></h3>
                <button onClick={onClickRemoveTodoList}>x</button>
            </div>
            <AddItemForm addItem={(title:string) => {
                dispatch(addTaskAC(title, props.id))
            }}/>
            <div className="tasks">
                <ul className='item_list'>
                    {taskToDisplay.map(task => {
                        const removeCurrentTask = () => {
                            dispatch(removeTaskAC(task.id, props.id))
                        }
                        const onHandleTask = () => {
                            dispatch(toggleCheckboxTaskAC(task.id, props.id))
                        }
                        return <li key={task.id}  className={task.isDone ? 'complete_task' : ''}>
                            <input type="checkbox" onChange={onHandleTask} checked={task.isDone}/>
                            <EditableValue text={task.title} changeTask={changeTask} id={task.id}/>
                            <button onClick={removeCurrentTask}>x</button>
                        </li>
                    })}
                </ul>
            </div>
            <div className="buttons">
                <button className={props.filter == 'all' ? 'active_button' : ''} onClick={() => onChangeFilterHandler('all')}>All</button>
                <button className={props.filter == 'active' ? 'active_button' : ''} onClick={() => onChangeFilterHandler('active')}>Active</button>
                <button className={props.filter == 'completed' ? 'active_button' : ''} onClick={() => onChangeFilterHandler('completed')}>Completed</button>
            </div>
        </section>
    );
};

export default TodoList;