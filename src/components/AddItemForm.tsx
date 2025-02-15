import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void;
    placeholder:string;
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
    const [valueInput, setValueInput] = useState('')
    const [errorTextInput, setErrorTextInput] = useState(false)
    const newValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
        setErrorTextInput(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addItem(valueInput)
            setValueInput('')
        }
    }
    const addNewTask = () => {
        if (valueInput) {
            props.addItem(valueInput)
            setValueInput('')
        } else {
            setErrorTextInput(true)
        }
    }
    return <div style={{ margin: '20px 0px' }}>
        <TextField variant={"outlined"}
                   label={props.placeholder}
                   id="outlined-size-small"
                   size="small"
                   error={errorTextInput}
                   helperText={errorTextInput ? 'Поле ввода пустое' : ''}
                   value={valueInput}
                   onChange={newValueChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={errorTextInput ? 'error_input' : ''}
        />
        <IconButton onClick={addNewTask}>
            <ControlPoint/>
        </IconButton>
    </div>
})