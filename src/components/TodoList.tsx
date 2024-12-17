import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "../App";

export type TaskType = {
    id:string;
    title:string;
    isDone:boolean;
}

type PropsType = {
    title:string;
    tasks:Array<TaskType>;
    removeTask: (id:string) => void;
    setFilterTask:(filter:FilterType) => void;
    addTask:(title:string) => void
}

const TodoList = (props:PropsType) => {
    const [valueInput, setValueInput] = useState('')

    const newValueChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            props.addTask(valueInput)
            setValueInput('')
        }
    }
    const addNewTask = () => {
        props.addTask(valueInput)
        setValueInput('')
    }
    const onAllClickHandler = () => {props.setFilterTask('all')}
    const onActiveClickHandler = () => {props.setFilterTask('active')}
    const onCompletedClickHandler = () => {props.setFilterTask('completed')}

    return (
        <section>
            <h3>{props.title}</h3>
            <div>
                <input  value={valueInput}
                        onChange={newValueChangeHandler}
                        onKeyPress={onKeyPressHandler}/>
                <button onClick={addNewTask}>+</button>
            </div>
            <div className="tasks">
                <ul>
                    {props.tasks.map(task => {
                        const removeCurrentTask = () => {
                             props.removeTask(task.id)
                        }
                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            {task.title}
                            <button onClick={removeCurrentTask}>x</button>
                        </li>
                    })}
                </ul>
            </div>
            <div className="buttons">
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </section>
    );
};

export default TodoList;