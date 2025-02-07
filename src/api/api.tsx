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
            console.log(title)
            return instance.post('todo-lists', {title: title} )
                .then(res => res.data.data.data.item)
        }
    },
    tasks: {
        getTasks(todoListId:string){
            return instance.get(`todo-lists/${todoListId}/tasks`).then(res => res.data.items)
        }
    }
}