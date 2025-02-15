import {combineReducers, createStore, applyMiddleware} from 'redux'
import {todoListReducer} from "./todoListReducer";
import {taskReducer} from "./taskReducer";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: taskReducer
})

export type AppRootType = ReturnType<typeof rootReducer>
export let store = createStore(rootReducer, applyMiddleware(thunk))