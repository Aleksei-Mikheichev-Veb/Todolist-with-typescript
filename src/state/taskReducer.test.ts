import {useState} from "react";
import {v1} from "uuid";
import {addTaskAC, changeTitleTaskAC, removeTaskAC, taskReducer, toggleCheckboxTaskAC} from "./taskReducer";
import {addTodoListAC, removeTodoListAC} from "./todoListReducer";

test('task reducer should add one task', () => {
    const todoList1 = v1()
    const todoList2 = v1()
    const todoList3 = v1()
    const startState = {
        [todoList1]: [
            {id: v1(), title: 'HTML + CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
        ],
        [todoList2]: [
            {id: v1(), title: 'Ученик', isDone: false},
            {id: v1(), title: 'как закалялась сталь', isDone: false},
            {id: v1(), title: 'Внутри убийцы', isDone: true},
        ],
        [todoList3]: [
            {id: v1(), title: 'Вынести добавление тасок отдельно', isDone: true},
            {id: v1(), title: 'Форма добавления todolist ', isDone: true},
            {id: v1(), title: 'чтоб в инпуте был текс при даблклике', isDone: true},
            {id: v1(), title: 'попробовать material UI', isDone: false},
            {id: v1(), title: 'написать тесты и сделать reducer ', isDone: true},
            {id: v1(), title: 'написать остальные функции вредусер ', isDone: false},
        ]
    }

    const endState = taskReducer(startState, addTaskAC('new Title',todoList2))

    expect(endState[todoList1].length).toBe(4)
    expect(endState[todoList3].length).toBe(6)
    expect(endState[todoList2].length).toBe(4)
    expect(endState[todoList2][endState[todoList2].length-1].id).toBeDefined()
    expect(endState[todoList2][endState[todoList2].length-1].title).toBe('new Title')
    expect(endState[todoList2][endState[todoList2].length-1].isDone).toBe(false)
})


test('task reducer should remove one task', () => {
    const todoList1 = v1()
    const todoList2 = v1()
    const todoList3 = v1()
    const startState = {
        [todoList1]: [
            {id: '1', title: 'HTML + CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Typescript', isDone: false},
        ],
        [todoList2]: [
            {id: '1', title: 'Ученик', isDone: false},
            {id: '2', title: 'как закалялась сталь', isDone: false},
            {id: '3', title: 'Внутри убийцы', isDone: true},
        ],
        [todoList3]: [
            {id: '1', title: 'Вынести добавление тасок отдельно', isDone: true},
            {id: '2', title: 'Форма добавления todolist ', isDone: true},
            {id: '3', title: 'чтоб в инпуте был текс при даблклике', isDone: true},
            {id: '4', title: 'попробовать material UI', isDone: false},
            {id: '5', title: 'написать тесты и сделать reducer ', isDone: true},
            {id: '6', title: 'написать остальные функции вредусер ', isDone: false},
        ]
    }

    const endState = taskReducer(startState, removeTaskAC('2', todoList2))

    expect(endState[todoList1].length).toBe(4)
    expect(endState[todoList3].length).toBe(6)
    expect(endState[todoList2].length).toBe(2)
    expect(endState[todoList2].every(l => l.id != '2')).toBe(true)
})

test('task reducer should change value of checkbox of one task', () => {
    const todoList1 = v1()
    const todoList2 = v1()
    const todoList3 = v1()
    const startState = {
        [todoList1]: [
            {id: '1', title: 'HTML + CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Typescript', isDone: false},
        ],
        [todoList2]: [
            {id: '1', title: 'Ученик', isDone: false},
            {id: '2', title: 'как закалялась сталь', isDone: false},
            {id: '3', title: 'Внутри убийцы', isDone: true},
        ],
        [todoList3]: [
            {id: '1', title: 'Вынести добавление тасок отдельно', isDone: true},
            {id: '2', title: 'Форма добавления todolist ', isDone: true},
            {id: '3', title: 'чтоб в инпуте был текс при даблклике', isDone: true},
            {id: '4', title: 'попробовать material UI', isDone: false},
            {id: '5', title: 'написать тесты и сделать reducer ', isDone: true},
            {id: '6', title: 'написать остальные функции вредусер ', isDone: false},
        ]
    }

    const endState = taskReducer(startState, toggleCheckboxTaskAC('2', todoList2 ))

    expect(endState[todoList2][1].isDone).toBeTruthy()
    expect(endState[todoList1][1].isDone).toBeTruthy()
})

test('task reducer should change title of one task', () => {
    const todoList1 = v1()
    const todoList2 = v1()
    const todoList3 = v1()
    const startState = {
        [todoList1]: [
            {id: '1', title: 'HTML + CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Typescript', isDone: false},
        ],
        [todoList2]: [
            {id: '1', title: 'Ученик', isDone: false},
            {id: '2', title: 'как закалялась сталь', isDone: false},
            {id: '3', title: 'Внутри убийцы', isDone: true},
        ],
        [todoList3]: [
            {id: '1', title: 'Вынести добавление тасок отдельно', isDone: true},
            {id: '2', title: 'Форма добавления todolist ', isDone: true},
            {id: '3', title: 'чтоб в инпуте был текс при даблклике', isDone: true},
            {id: '4', title: 'попробовать material UI', isDone: false},
            {id: '5', title: 'написать тесты и сделать reducer ', isDone: true},
            {id: '6', title: 'написать остальные функции вредусер ', isDone: false},
        ]
    }

    const endState = taskReducer(startState, changeTitleTaskAC('Хирург', todoList2, '2'))

    expect(endState[todoList2][1].title).toBe('Хирург')
    expect(endState[todoList1][1].title).toBe('JS')
})

test('when added new todoList task reducer should add new property with array', () => {
    const todoList1 = v1()
    const todoList2 = v1()
    const todoList3 = v1()
    const startState = {
        [todoList1]: [
            {id: '1', title: 'HTML + CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Typescript', isDone: false},
        ],
        [todoList2]: [
            {id: '1', title: 'Ученик', isDone: false},
            {id: '2', title: 'как закалялась сталь', isDone: false},
            {id: '3', title: 'Внутри убийцы', isDone: true},
        ],
        [todoList3]: [
            {id: '1', title: 'Вынести добавление тасок отдельно', isDone: true},
            {id: '2', title: 'Форма добавления todolist ', isDone: true},
            {id: '3', title: 'чтоб в инпуте был текс при даблклике', isDone: true},
            {id: '4', title: 'попробовать material UI', isDone: false},
            {id: '5', title: 'написать тесты и сделать reducer ', isDone: true},
            {id: '6', title: 'написать остальные функции вредусер ', isDone: false},
        ]
    }

    const endState = taskReducer(startState, addTodoListAC('new title', 'some id'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todoList1 && k != todoList2 && k != todoList1)
    if(!newKey) {
        throw Error('error')
    }
    expect(keys.length).toBe(4)
    expect(endState[newKey]).toStrictEqual([])
})
test('property with array tasks should be delete', () => {
    const todoList1 = v1()
    const todoList2 = v1()
    const todoList3 = v1()
    const startState = {
        [todoList1]: [
            {id: '1', title: 'HTML + CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Typescript', isDone: false},
        ],
        [todoList2]: [
            {id: '1', title: 'Ученик', isDone: false},
            {id: '2', title: 'как закалялась сталь', isDone: false},
            {id: '3', title: 'Внутри убийцы', isDone: true},
        ],
        [todoList3]: [
            {id: '1', title: 'Вынести добавление тасок отдельно', isDone: true},
            {id: '2', title: 'Форма добавления todolist ', isDone: true},
            {id: '3', title: 'чтоб в инпуте был текс при даблклике', isDone: true},
            {id: '4', title: 'попробовать material UI', isDone: false},
            {id: '5', title: 'написать тесты и сделать reducer ', isDone: true},
            {id: '6', title: 'написать остальные функции вредусер ', isDone: false},
        ]
    }

    const endState = taskReducer(startState, removeTodoListAC(todoList2))
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
})