import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {
    createNewTodoListThunk,
    getTodoListsThunk,
    TodoListType
} from "./state/todoListReducer";
import { useSelector} from "react-redux";
import {AppRootType} from "./state/store";
import {useEffect} from "react";
import {useActions} from "./hooks/useAction";


function AppWithRedux() {

    const todoLists = useSelector<AppRootType, Array<TodoListType>>(state => state.todoLists)
    const {getTodoListsThunk, createNewTodoListThunk} = useActions()
    useEffect(() => {
        getTodoListsThunk()
    }, [])
    console.log('in app')
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

