import {ActionAddTodoListType, ActionRemoveTodoListType} from "./typesTodoListActions";

export type ActionAddTaskType = {
    type: 'ADD_TASK';
    todoListId: string;
    title:string;
    id:string;
}
export type ActionRemoveTaskType = {
    type: 'REMOVE_TASK';
    todoListId:string;
    taskId:string
}
export type ActionToggleCheckboxTaskType = {
    type: 'TOGGLE_CHECKBOX_TASK';
    taskId:string;
    todoListId:string;
}
export type ActionChangeTitleTaskType = {
    type: 'CHANGE_TITLE_TASK';
    title:string;
    taskId:string;
    todoListId:string;
}
export type ActionAddTasksInTodoList = {
    type: 'ADD_TASKS_IN_TODOLISTS';
    todoListId:string;
    tasks:any[]

}
export type ActionsTypeTasks = ActionAddTaskType | ActionRemoveTaskType | ActionToggleCheckboxTaskType |
    ActionChangeTitleTaskType | ActionAddTodoListType | ActionRemoveTodoListType | ActionAddTasksInTodoList;
