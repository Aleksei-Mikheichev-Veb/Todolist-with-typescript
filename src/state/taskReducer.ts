import {v1} from "uuid";
import {TaskType} from "../components/TodoList";
import {ActionAddTodoListType, ActionRemoveTodoListType} from "../types/typesTodoListActions";
import {Dispatch} from "redux";
import {Api} from "../api/api";
import {
    ActionAddTaskType, ActionChangeTitleTaskType,
    ActionRemoveTaskType,
    ActionsTypeTasks,
    ActionToggleCheckboxTaskType
} from "../types/typesTaskActions";

export type TaskInTodoListType = {
    [key:string]: Array<TaskType>
}

const initialState = {
    // [todoList1]: [
    //     {id: v1(), title: 'HTML + CSS', completed: true},
    //     {id: v1(), title: 'JS', completed: true},
    //     {id: v1(), title: 'React', completed: false},
    //     {id: v1(), title: 'Typescript', completed: false},
    // ],
    // [todoList2]: [
    //     {id: v1(), title: 'Ученик', completed: false},
    //     {id: v1(), title: 'как закалялась сталь', completed: false},
    //     {id: v1(), title: 'Внутри убийцы', completed: true},
    // ],
    // [todoList3]: [
    //     {id: v1(), title: 'Вынести добавление тасок отдельно', completed: true},
    //     {id: v1(), title: 'Форма добавления todolist ', completed: true},
    //     {id: v1(), title: 'чтоб в инпуте был текс при даблклике', completed: true},
    //     {id: v1(), title: 'попробовать material UI', completed: false},
    //     {id: v1(), title: 'написать тесты и сделать reducer ', completed: true},completed
    //     {id: v1(), title: 'написать остальные функции вредусер ', completed: true},
    //     {id: v1(), title: 'добавить в удаление и добавление листа, чтобы удалял и там и там ', completed: true},
    //     {id: v1(), title: 'сделать state на usereducer ', completed: false},
    //     {id: v1(), title: 'сделать state на redux  ', completed: false},
    //     {id: v1(), title: 'докомпозировать app. вынестип лишнее внутрь  ', completed: false},
    // ]
}

export const taskReducer = (state: TaskInTodoListType = initialState, action:ActionsTypeTasks) => {
    switch (action.type) {
        case 'ADD_TASKS_IN_TODOLISTS' : {
            const tasks = action.tasks.map( task => {
                return {id: task.id, title: task.title, completed: false}
            })
            return {...state,[action.todoListId]: tasks}
        }
        case 'ADD_TASK' : {
            const newTask = {id:v1(), title: action.title, completed: false }
            const newTodoList = [...state[action.todoListId], newTask]
            return {...state, [action.todoListId]: newTodoList}
        }
        case 'REMOVE_TASK' : {
            const newTodoList = state[action.todoListId].filter(task => task.id != action.taskId)
            return {...state,[action.todoListId]: newTodoList }
        }
        case "TOGGLE_CHECKBOX_TASK": {
            const newTodoList = state[action.todoListId].map(task => {
                return task.id == action.taskId ? {...task, completed: !task.completed} : task
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

export const addTasksInTodoListAC = (tasks:any[], todoListId:string) => ({type: 'ADD_TASKS_IN_TODOLISTS', tasks, todoListId})
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

export const getTasksThunk = (todoListId:string) => {
    return async (dispatch:Dispatch) => {
        const tasks = await Api.tasks.getTasks(todoListId)
        dispatch(addTasksInTodoListAC(tasks, todoListId))
    }
}