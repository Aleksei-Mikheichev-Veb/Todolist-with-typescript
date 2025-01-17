import {FilterType, TodoListType} from "../AppWithReducer";
import {v1} from "uuid";


export type ActionRemoveTodoListType = {
    type:"REMOVE_TODOLIST";
    id: string;
}
export type ActionAddTodoListType = {
    type:'ADD_TODOLIST';
    title: string;
    todoListId:string;
}
export type ActionChangeFilterTodoList = {
    type:'CHANGE_FILTER_TODOLIST';
    id: string ;
    filter: FilterType;
}
export type ActionChangeTitleTodoList = {
    type:'CHANGE_TITLE_TODOLIST';
    id: string ;
    title: string;
}

type ActionType = ActionRemoveTodoListType
    | ActionAddTodoListType
    | ActionChangeTitleTodoList
    | ActionChangeFilterTodoList;

export const todoListReducer = (state:Array<TodoListType> , action:ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(list => list.id !== action.id)
        }
        case 'ADD_TODOLIST': {
            return [{id: action.todoListId, title: action.title, filter: "all"}, ...state  ]
        }
        case 'CHANGE_FILTER_TODOLIST': {
            return state.map( todolist => {
               return todolist.id == action.id ? {...todolist, filter: action.filter} : todolist
            })
        }
        case "CHANGE_TITLE_TODOLIST": {
            return state.map( todolist => {
                return todolist.id == action.id ? {...todolist, title: action.title} : todolist
            })
        }
        default: return state
    }
}

export const removeTodoListAC = (idTodolist:string): ActionRemoveTodoListType => ({type: 'REMOVE_TODOLIST', id: idTodolist});
export const addTodoListAC = (title:string): ActionAddTodoListType => ({type:'ADD_TODOLIST', title: title, todoListId:v1()});
export const changeTitleTodoListAC = (title: string, idTodolist:string): ActionChangeTitleTodoList => ({type: 'CHANGE_TITLE_TODOLIST', id: idTodolist, title:title});
export const changeFilterTodoListAC = (idTodolist:string, filter:FilterType): ActionChangeFilterTodoList => ({type: 'CHANGE_FILTER_TODOLIST', id: idTodolist, filter:filter});