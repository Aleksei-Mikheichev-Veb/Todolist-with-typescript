import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    text:string;
    changeTask:(newValue:string, idTask:string) => void;
    id:string
}

const EditableValue = (props:PropsType) => {
    const [isSpan, setIsSpan] = useState(true)
    const [inputValue, setInputValue] = useState(props.text)

    const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const onChangeToInput = () => {
        setIsSpan(false)
    }
    const onBlurHandlerToSpan = ( ) => {
        setIsSpan(true)
        props.changeTask(inputValue, props.id)
        // setInputValue('')
    }
    const onKeyPressHandlerToSpan = ( e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            setIsSpan(true)
            props.changeTask(inputValue, props.id)
            // setInputValue('')
        }
    }

    return (<>
            {isSpan
                ? <span onDoubleClick={onChangeToInput}>{props.text}</span>
                : <input type="text"
                         autoFocus
                         value={inputValue}
                         onBlur={onBlurHandlerToSpan}
                         onKeyPress={onKeyPressHandlerToSpan}
                         onChange={handleOnChange}/>
            }
    </>
    )
}

export default EditableValue