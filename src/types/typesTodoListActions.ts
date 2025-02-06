import {FilterType} from "../state/todoListReducer";

export type TodoListFromApi = {id:string, title:string}[]
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
export type ActionAddTodoListsFromApi = {
    type: 'ADD_TODOLISTS_FROM_API';
    todoLists: TodoListFromApi;
}
export type ActionTypeTodoList = ActionRemoveTodoListType
    | ActionAddTodoListType
    | ActionChangeTitleTodoList
    | ActionAddTodoListsFromApi
    | ActionChangeFilterTodoList;