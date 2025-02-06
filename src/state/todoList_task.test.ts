import {taskReducer} from "./taskReducer";
import {addTodoListAC, todoListReducer, TodoListType} from "./todoListReducer";

test('id new todolist should equal in task reducer and todolist reducer', () => {
    const startStateTask = {}
    const startStateTodoList: Array<TodoListType> = []

    const action = addTodoListAC('new task', 'some id')
    const endStateTask = taskReducer(startStateTask, action)
    const endStateTodoList = todoListReducer(startStateTodoList, action)


    const keys = Object.keys(endStateTask)
    const newIdTasks = keys[0]
    const newIdTodoList = endStateTodoList[0].id

    expect(newIdTasks).toBe(newIdTodoList)
})
