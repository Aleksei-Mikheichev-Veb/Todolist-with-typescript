import {combineReducers, createStore } from 'redux'
import {todoListReducer} from "./todoListReducer";
import {taskReducer} from "./taskReducer";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: taskReducer
})

export type AppRootType = ReturnType<typeof rootReducer>
export let store = createStore(rootReducer)