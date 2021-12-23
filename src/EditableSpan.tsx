import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}


export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    return (
        editMode ?
            <TextField
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={changeTitle}
                fullWidth
            />
            : <span
                onDoubleClick={onEditMode}>
                {props.title}
        </span>
    );
};

