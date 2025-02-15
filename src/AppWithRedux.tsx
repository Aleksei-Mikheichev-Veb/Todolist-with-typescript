import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {
    createNewTodoListThunk,
    getTodoListsThunk,
} from "./state/todoListReducer";
import {useEffect} from "react";
import {useActions} from "./hooks/useAction";
import {useAppSelector} from "./hooks/useTypeSelectorHook";
import Container from '@mui/material/Container';
import {Grid, Paper} from "@mui/material";


function AppWithRedux() {

    const todoLists = useAppSelector(state => state.todoLists)
    const {getTodoListsThunk, createNewTodoListThunk} = useActions()

    useEffect(() => {
        getTodoListsThunk()
    }, [])
    return (
        <div className="App">
            <Container fixed>
                <AddItemForm placeholder={"Add todolist"} addItem={(title: string) => {
                    createNewTodoListThunk(title)
                }}/>
                <Grid container spacing={6}>
                    {todoLists.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper elevation={6} style={{ padding: 15 }}>
                                <TodoList

                                    title={tl.title}
                                    id={tl.id}
                                    filter={tl.filter}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

