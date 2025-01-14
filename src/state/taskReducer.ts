import {TaskInTodoListType} from "../App";
import {v1} from "uuid";
import {ActionAddTodoListType, ActionRemoveTodoListType} from "./todoListReducer";

type ActionAddTaskType = {
    type: 'ADD_TASK';
    todoListId: string;
    title:string
}
type ActionRemoveTaskType = {
    type: 'REMOVE_TASK';
    todoListId:string;
    taskId:string
}
type ActionToggleCheckboxTaskType = {
    type: 'TOGGLE_CHECKBOX_TASK';
    taskId:string;
    todoListId:string;
}
type ActionChangeTitleTaskType = {
    type: 'CHANGE_TITLE_TASK';
    title:string;
    taskId:string;
    todoListId:string;
}
type ActionsType = ActionAddTaskType | ActionRemoveTaskType | ActionToggleCheckboxTaskType |
    ActionChangeTitleTaskType | ActionAddTodoListType | ActionRemoveTodoListType;

export const taskReducer = (state: TaskInTodoListType, action:ActionsType) => {
    switch (action.type) {
        case 'ADD_TASK' : {
            const newTask = {id:v1(), title: action.title, isDone: false }
            const newTodoList = [...state[action.todoListId], newTask]
            return {...state, [action.todoListId]: newTodoList}
        }
        case 'REMOVE_TASK' : {
            const newTodoList = state[action.todoListId].filter(task => task.id != action.taskId)
            return {...state,[action.todoListId]: newTodoList }
        }
        case "TOGGLE_CHECKBOX_TASK": {
            const newTodoList = state[action.todoListId].map(task => {
                return task.id == action.taskId ? {...task, isDone: !task.isDone} : task
            })
            return {...state, [action.todoListId]: newTodoList }
        }
        case "CHANGE_TITLE_TASK": {
            const newTodoList = state[action.todoListId].map(task => {
                return task.id == action.taskId ? {...task, title: action.title} : task;
            })
            return {...state, [action.todoListId]: newTodoList }
        }
        case 'ADD_TODOLIST': {

            return {[action.todoListId]: [], ...state}
        }
        case "REMOVE_TODOLIST": {
            const newTasksInTodoList = {...state}
            delete newTasksInTodoList[action.id]
            return newTasksInTodoList
        }
        default : return state
    }
}

export const addTaskAC = (title:string, todoListId:string):ActionAddTaskType => ({
    type:"ADD_TASK", title, todoListId
})
export const removeTaskAC = (taskId:string, todoListId:string):ActionRemoveTaskType => ({
    type:"REMOVE_TASK", taskId, todoListId
})
export const toggleCheckboxTask = (taskId:string, todoListId: string):ActionToggleCheckboxTaskType => ({
    type:"TOGGLE_CHECKBOX_TASK", taskId, todoListId
})
export const changeTitleTask = (title:string, taskId:string, todoListId:string): ActionChangeTitleTaskType => ({
    type:"CHANGE_TITLE_TASK", title, taskId, todoListId
})