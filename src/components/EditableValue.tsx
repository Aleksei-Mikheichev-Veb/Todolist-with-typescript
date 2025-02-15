import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type PropsType = {
    text: string;
    changeTask: (newValue: string, idTask: string) => void;
    id: string
}

const EditableValue = React.memo((props: PropsType) => {
    const [isSpan, setIsSpan] = useState(true)
    const [inputValue, setInputValue] = useState(props.text)
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const onChangeToInput = () => {
        setIsSpan(false)
    }
    const onBlurHandlerToSpan = () => {
        setIsSpan(true)
        props.changeTask(inputValue, props.id)
    }
    const onKeyPressHandlerToSpan = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsSpan(true)
            props.changeTask(inputValue, props.id)
        }
    }

    return (<>
            {isSpan
                ? <span onClick={onChangeToInput}>{props.text}</span>
                : <TextField
                    size="small"
                    autoFocus
                    value={inputValue}
                    onBlur={onBlurHandlerToSpan}
                    onKeyPress={onKeyPressHandlerToSpan}
                    onChange={handleOnChange}/>
            }
        </>
    )
})

export default EditableValue