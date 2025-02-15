import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import EditableValue from "./EditableValue";
import {
    changeTitleTaskAC, getTasksThunk
} from "../state/taskReducer";
import {useSelector} from "react-redux";
import {
    changeFilterTodoListAC, changeTitleTodoListThunk,
    deleteTodoListThunk, FilterType,
} from "../state/todoListReducer";
import {AppRootType} from "../state/store";
import {useActions} from "../hooks/useAction";
import TasksList from "./TasksList";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType = {
    id: string;
    title: string;
    completed: boolean;
}

type PropsType = {
    title: string;
    id: string;
    filter: FilterType;
}

const TodoList = React.memo((props: PropsType) => {
    const {
        getTasksThunk, changeFilterTodoListAC,
        changeTitleTodoListThunk, changeTitleTaskAC, createNewTaskThunk, deleteTodoListThunk
    } = useActions()
    const tasksInTodoList = useSelector<AppRootType, Array<TaskType>>(state => {
        return state.tasks[props.id]
    })
    let taskToDisplay = tasksInTodoList;
    if (props.filter === 'active') {
        taskToDisplay = tasksInTodoList.filter(task => !task.completed)
    } else if (props.filter === 'completed') {
        taskToDisplay = tasksInTodoList.filter(task => task.completed)
    }

    const onChangeFilterHandler = (filter: FilterType) => {
        changeFilterTodoListAC(props.id, filter)
    }

    const onClickRemoveTodoList = () => {
        deleteTodoListThunk(props.id)
    }
    const changeTodoListTitle = (newValue: string) => {
        changeTitleTodoListThunk(newValue, props.id)
    }
    const changeTask = useCallback((newValue: string, idTask: string) => {
        changeTitleTaskAC(newValue, props.id, idTask)
    }, [])
    const addItem = useCallback((title: string) => {
        createNewTaskThunk(title, props.id)
    }, [])
    useEffect(() => {
        getTasksThunk(props.id)
    }, [props.id])
    return (
        <section>
            <div className="title">
                <h3>
                    <EditableValue text={props.title} changeTask={changeTodoListTitle} id={props.id}/>
                    <IconButton onClick={onClickRemoveTodoList}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>

            </div>
            <AddItemForm placeholder={"Add task"} addItem={addItem}/>
            {taskToDisplay && <TasksList taskToDisplay={taskToDisplay} changeTask={changeTask} id={props.id}/>}

            <div className="buttons">
                <Button variant={props.filter == 'all' ? 'contained' : 'text'} color={"inherit"}
                        onClick={() => onChangeFilterHandler('all')}>All</Button>
                <Button variant={props.filter == 'active' ? "contained" : 'text'} color={"primary"}
                        onClick={() => onChangeFilterHandler('active')}>Active</Button>
                <Button variant={props.filter == 'completed' ? "contained" : 'text'} color={"secondary"}
                        onClick={() => onChangeFilterHandler('completed')}>Completed</Button>
            </div>
        </section>
    );
});

export default TodoList;


