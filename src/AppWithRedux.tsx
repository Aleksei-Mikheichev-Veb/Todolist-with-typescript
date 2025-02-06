import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodoListAC,
    createNewTodoListThunk,
    getTodoListsThunk,
    TodoListType
} from "./state/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";
import {useEffect} from "react";
import {Dispatch} from "redux";
import {ActionType} from "./types/types";
import {useActions} from "./hooks/useAction";


function AppWithRedux() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootType, Array<TodoListType>>(state => state.todoLists)
    const {getTodoListsThunk, createNewTodoListThunk} = useActions()
    useEffect(() => {
        getTodoListsThunk()
        // dispatch(getTodoListsThunk())
    })

    return (
        <div className="App">
            <AddItemForm addItem={(title:string) => {
                createNewTodoListThunk(title)
            }}/>
            <div className='todo_lists'>
                {todoLists.map(tl => {
                    return <TodoList
                        key={tl.id}
                        title={tl.title}
                        id={tl.id}
                        filter={tl.filter}
                    />
                })}
            </div>

        </div>
    );
}

export default AppWithRedux;

