import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsAddItemFormType = {
    addTask: (title: string) => void;
}
export const AddItemForm = (props: PropsAddItemFormType) => {
    const [valueInput, setValueInput] = useState('')
    const [errorTextInput, setErrorTextInput] = useState(false)

    const newValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
        setErrorTextInput(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(valueInput)
            setValueInput('')
        }
    }
    const addNewTask = () => {
        if (valueInput) {
            props.addTask(valueInput)
            setValueInput('')
        } else {
            setErrorTextInput(true)
        }
    }
    return <div>
        <input value={valueInput}
               onChange={newValueChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={errorTextInput ? 'error_input' : ''}
        />
        <button onClick={addNewTask}>+</button>
        {errorTextInput && <div className='error'>Поле ввода пустое</div>}
    </div>
}