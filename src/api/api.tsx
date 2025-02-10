import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '754b49ab-22ce-4ba4-aa23-b9254686e973'
    }
})
export const Api = {
    todoList:{
        getTodoLists() {
            return instance.get('todo-lists' )
                .then(res => res.data)
        },
        createTodoList(title:string) {
            return instance.post('todo-lists', {title: title} )
                .then(res => res.data.data.item)
        },
        changeTitleTodoList(todoListId:string, title:string) {
            return instance.put(`todo-lists/${todoListId}`, {title: title} )
                .then(res => res.data)
        },
        deleteTodoList(todoListId:string){
            return instance.delete(`todo-lists/${todoListId}`).then(res => res.data)
        }
    },
    tasks: {
        getTasks(todoListId:string){
            return instance.get(`todo-lists/${todoListId}/tasks`).then(res => res.data.items)
        },
        createTask(title:string, todoListId:string){
            return instance.post(`todo-lists/${todoListId}/tasks`, {title: title})
                .then(res => {
                    return res.data.data.item
                })
        },
        deleteTask(taskId:string, todoListId:string){
            console.log(taskId,todoListId  )
            return instance.delete(`todo-lists//tasks/${taskId}`).then(res => res.data)
        }
    }
}