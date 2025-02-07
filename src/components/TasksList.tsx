import React from 'react';
import {removeTaskAC, toggleCheckboxTaskAC} from "../state/taskReducer";
import EditableValue from "./EditableValue";
import {useActions} from "../hooks/useAction";
import {TaskType} from "./TodoList";

type PropsType = {
    changeTask: (newValue:string, idTask:string) => void;
    id:string;
    taskToDisplay: Array<TaskType>;
}

const TasksList = (props:PropsType) => {
    const {removeTaskAC, toggleCheckboxTaskAC} = useActions()
    return (
        <div className="tasks">
            <ul className='item_list'>
                {props.taskToDisplay.map(task => {
                    const removeCurrentTask = () => {
                        removeTaskAC(task.id, props.id)
                    }
                    const onHandleTask = () => {
                        toggleCheckboxTaskAC(task.id, props.id)
                    }
                    return <li key={task.id}  className={task.completed ? 'complete_task' : ''}>
                        <input type="checkbox" onChange={onHandleTask} checked={task.completed}/>
                        <EditableValue text={task.title} changeTask={props.changeTask} id={task.id}/>
                        <button onClick={removeCurrentTask}>x</button>
                    </li>
                })}
            </ul>
        </div>
    );
};

export default TasksList;