import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type addItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: addItemFormType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            addItem();
        }
    }

    const errorClass = error ? "error" : "" ;
    const errorMessage = <div style={{color: "red"}}>Title is required!</div>

    return(
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={errorClass}
                />
                <IconButton onClick={addItem}>
                    <AddBox/>
                </IconButton>
                {error && errorMessage}
            </div>
    )
}