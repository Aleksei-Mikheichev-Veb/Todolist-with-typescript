import React from 'react';
import {FilterType} from "../App";
import './../App.css'
import {AddItemForm} from "./AddItemForm";
import EditableValue from "./EditableValue";

export type TaskType = {
    id:string;
    title:string;
    isDone:boolean;
}

type PropsType = {
    title:string;
    tasks:Array<TaskType>;
    id:string;
    filter:FilterType;
    removeTask: (id:string, todoListId:string) => void;
    setFilterTask:(filter:FilterType, todoListId: string) => void;
    addTask:(title:string, todoListId: string) => void;
    changeTask:(newValue:string, idTodoList:string, idTask:string) => void;
    changeTodoListTitle:(newValue:string, idTodoList:string) => void;
    toggleCheckboxTask: (id:string, todoListId:string) => void;
    removeTodoList:(id:string) => void
}

const TodoList = (props:PropsType) => {


    const onAllClickHandler = () => {props.setFilterTask('all', props.id)}
    const onActiveClickHandler = () => {props.setFilterTask('active',props.id)}
    const onCompletedClickHandler = () => {props.setFilterTask('completed', props.id)}

    const addTask = (title:string) => {
        props.addTask(title, props.id)
    }
    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (newValue:string) => {
        props.changeTodoListTitle(newValue, props.id)
    }
    const changeTask = (newValue:string, idTask:string) => {
        props.changeTask(newValue, props.id, idTask )
    }
    return (
        <section>
            <div className="title">
                <h3><EditableValue text={props.title} changeTask={changeTodoListTitle} id={props.id}/></h3>
                <button onClick={onClickRemoveTodoList}>x</button>
            </div>
            <AddItemForm addTask={addTask} />
            <div className="tasks">
                <ul className='item_list'>
                    {props.tasks.map(task => {
                        const removeCurrentTask = () => {
                             props.removeTask(task.id, props.id)
                        }
                        const onHandleTask = () => {
                            props.toggleCheckboxTask(task.id, props.id)
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
                <button className={props.filter == 'all' ? 'active_button' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter == 'active' ? 'active_button' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter == 'completed' ? 'active_button' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </section>
    );
};

export default TodoList;