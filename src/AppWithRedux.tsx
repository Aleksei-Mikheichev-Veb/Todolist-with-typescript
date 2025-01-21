import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {addTodoListAC, TodoListType} from "./state/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";


function AppWithRedux() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootType, Array<TodoListType>>(state => state.todoLists)



    return (
        <div className="App">
            <AddItemForm addItem={(title:string) => {
                dispatch(addTodoListAC(title))
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
