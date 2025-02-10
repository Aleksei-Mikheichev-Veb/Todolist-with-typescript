import { Dispatch} from "redux";
import {Api} from "../api/api";
import {
    ActionAddTodoListsFromApi,
    ActionAddTodoListType, ActionChangeFilterTodoList, ActionChangeTitleTodoList, ActionRemoveTodoListType,
    ActionTypeTodoList,
    TodoListFromApi
} from "../types/typesTodoListActions";

export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string;
    title: string;
    filter: FilterType
}

const initialState:Array<TodoListType> = [
    // {id: todoList1, title: 'Study', filter: 'all'},
    // {id: todoList2, title: 'Book', filter: 'active'},
    // {id: todoList3, title: 'Мои таски', filter: 'all'},
]
export const todoListReducer = (state:Array<TodoListType> = initialState , action:ActionTypeTodoList): Array<TodoListType> => {
    switch (action.type) {
        case 'ADD_TODOLISTS_FROM_API': {
            if(action.todoLists.length != 0){
                return action.todoLists.map((todoList) => {
                    return {id: todoList.id, title: todoList.title, filter: "all"}
                })
            }
            return state
        }
        case 'ADD_TODOLIST': {
            return [{id: action.todoListId, title: action.title, filter: "all"}, ...state  ]
        }
        case 'REMOVE_TODOLIST': {
            return state.filter(list => list.id !== action.id)
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

export const addTodoListsFromApiAC = (todoLists:TodoListFromApi):ActionAddTodoListsFromApi => ({type:'ADD_TODOLISTS_FROM_API', todoLists})
export const addTodoListAC = (title:string, id:string): ActionAddTodoListType => ({type:'ADD_TODOLIST', title: title, todoListId:id});
export const removeTodoListAC = (idTodolist:string): ActionRemoveTodoListType => ({type: 'REMOVE_TODOLIST', id: idTodolist});
export const changeTitleTodoListAC = (title: string, idTodolist:string): ActionChangeTitleTodoList => ({type: 'CHANGE_TITLE_TODOLIST', id: idTodolist, title:title});
export const changeFilterTodoListAC = (idTodolist:string, filter:FilterType): ActionChangeFilterTodoList => ({type: 'CHANGE_FILTER_TODOLIST', id: idTodolist, filter:filter});


export const getTodoListsThunk = () => {
    return async (dispatch:Dispatch) => {
        const todoLists = await Api.todoList.getTodoLists()
        console.log(todoLists)
        dispatch(addTodoListsFromApiAC(todoLists))
    }
}
export const createNewTodoListThunk = (title:string) => {
    return async (dispatch:Dispatch) => {
        const newTodoList = await Api.todoList.createTodoList(title)
        dispatch(addTodoListAC(newTodoList.title, newTodoList.id))
    }
}
export const changeTitleTodoListThunk = (title:string, todoListId:string) => {
    return async (dispatch:Dispatch) => {
        const result = await Api.todoList.changeTitleTodoList(todoListId, title)
        console.log(result)
        dispatch(changeTitleTodoListAC(title, todoListId))
    }
}
export const deleteTodoListThunk = (todoListId:string) => {
    return async (dispatch:Dispatch) => {await Api.todoList.deleteTodoList(todoListId)
        dispatch(removeTodoListAC(todoListId))
    }
}