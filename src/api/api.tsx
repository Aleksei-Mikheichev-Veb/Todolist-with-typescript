import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '754b49ab-22ce-4ba4-aa23-b9254686e973'
    }
})

export const Api = {
    getTodoLists() {
        return instance.get('todo-lists' )
            .then(res => res.data)
    },
    createTodoList(title:string) {
        return instance.post('todo-list', title )
            .then(res => res.data.item)
    }
}