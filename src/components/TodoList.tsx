import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "../App";
import './../App.css'

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
    toggleCheckboxTask: (id:string, todoListId:string) => void;
}

const TodoList = (props:PropsType) => {
    const [valueInput, setValueInput] = useState('')
    const [errorTextInput, setErrorTextInput] = useState(false)

    const newValueChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
        setErrorTextInput(false)
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            props.addTask(valueInput, props.id)
            setValueInput('')
        }
    }
    const addNewTask = () => {
        if(valueInput){
            props.addTask(valueInput, props.id)
            setValueInput('')
        }else{
            setErrorTextInput(true)
        }

    }
    const onAllClickHandler = () => {props.setFilterTask('all', props.id)}
    const onActiveClickHandler = () => {props.setFilterTask('active',props.id)}
    const onCompletedClickHandler = () => {props.setFilterTask('completed', props.id)}

    return (
        <section>
            <h3>{props.title}</h3>
            <div>
                <input  value={valueInput}
                        onChange={newValueChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={errorTextInput ? 'error_input' : ''}
                />
                <button onClick={addNewTask}>+</button>
                {errorTextInput && <div className='error'>Поле ввода пустое</div>}
            </div>
            <div className="tasks">
                <ul className='item_list'>
                    {props.tasks.map(task => {
                        const removeCurrentTask = () => {
                             props.removeTask(task.id, props.id)
                        }
                        const onHandleTask = () => {
                            props.toggleCheckboxTask(task.id, props.id)
                        }
                        return <li key={task.id}  className={task.isDone ? 'active_task' : ''}>
                            <input type="checkbox" onChange={onHandleTask} checked={task.isDone}/>
                            {task.title}
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