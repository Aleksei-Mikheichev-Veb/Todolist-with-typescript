import {v1} from "uuid";
// import {ActionAddTodoListType, ActionRemoveTodoListType, todoList1, todoList2, todoList3} from "./todoListReducer";
import {TaskType} from "../components/TodoList";
import {ActionAddTodoListType, ActionRemoveTodoListType} from "../types/typesTodoListActions";

export type TaskInTodoListType = {
    [key:string]: Array<TaskType>
}

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
export type ActionsTypeTasks = ActionAddTaskType | ActionRemoveTaskType | ActionToggleCheckboxTaskType |
    ActionChangeTitleTaskType | ActionAddTodoListType | ActionRemoveTodoListType;

const initialState = {
    // [todoList1]: [
    //     {id: v1(), title: 'HTML + CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'Typescript', isDone: false},
    // ],
    // [todoList2]: [
    //     {id: v1(), title: 'Ученик', isDone: false},
    //     {id: v1(), title: 'как закалялась сталь', isDone: false},
    //     {id: v1(), title: 'Внутри убийцы', isDone: true},
    // ],
    // [todoList3]: [
    //     {id: v1(), title: 'Вынести добавление тасок отдельно', isDone: true},
    //     {id: v1(), title: 'Форма добавления todolist ', isDone: true},
    //     {id: v1(), title: 'чтоб в инпуте был текс при даблклике', isDone: true},
    //     {id: v1(), title: 'попробовать material UI', isDone: false},
    //     {id: v1(), title: 'написать тесты и сделать reducer ', isDone: true},
    //     {id: v1(), title: 'написать остальные функции вредусер ', isDone: true},
    //     {id: v1(), title: 'добавить в удаление и добавление листа, чтобы удалял и там и там ', isDone: true},
    //     {id: v1(), title: 'сделать state на usereducer ', isDone: false},
    //     {id: v1(), title: 'сделать state на redux  ', isDone: false},
    //     {id: v1(), title: 'докомпозировать app. вынестип лишнее внутрь  ', isDone: false},
    // ]
}

export const taskReducer = (state: TaskInTodoListType = initialState, action:ActionsTypeTasks) => {
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
export const toggleCheckboxTaskAC = (taskId:string, todoListId: string):ActionToggleCheckboxTaskType => ({
    type:"TOGGLE_CHECKBOX_TASK", taskId, todoListId
})
export const changeTitleTaskAC = (title:string, todoListId:string, taskId:string): ActionChangeTitleTaskType => ({
    type:"CHANGE_TITLE_TASK", title, taskId, todoListId
})