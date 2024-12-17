import React from 'react';
import {FilterType} from "../App";

export type TaskType = {
    id:number;
    title:string;
    isDone:boolean;
}

type PropsType = {
    title:string;
    tasks:Array<TaskType>;
    removeTask: (id:number) => void;
    setFilterTask:(filter:FilterType) => void;
    // addTask:(title:string) => void
}

const TodoList = (props:PropsType) => {

    // const addNewTask
    return (
        <section>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <div className="tasks">
                <ul>
                    {props.tasks.map(task => {
                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            {task.title}
                            <button onClick={() => props.removeTask(task.id)}>x</button>
                        </li>
                    })}
                </ul>
            </div>
            <div className="buttons">
                <button onClick={() => props.setFilterTask('all')}>All</button>
                <button onClick={() => props.setFilterTask('active')}>Active</button>
                <button onClick={() => props.setFilterTask('completed')}>Completed</button>
            </div>
        </section>
    );
};

export default TodoList;