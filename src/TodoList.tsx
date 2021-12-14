import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

function TodoList(props: PropsType) {

    const addTask = (title: string) =>  props.addTask(title, props.id)
    const setAllFilterValue = () => props.changeFilter("all", props.id)
    const setActiveFilterValue = () => props.changeFilter("active", props.id)
    const setCompletedFilterValue = () => props.changeFilter("completed", props.id)
    const getBtnClass = (filter: FilterValuesType) => props.filter === filter ? "active" : "";

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    const tasksJSX = props.tasks.map(task => {
        const getClasses = () => task.isDone ? "is-done" : "";
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(task.id, newTitle,  props.id)
        }

        const removeTask = () => props.removeTask(task.id, props.id)
        return (
            <li key={task.id} className={getClasses()}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })


    return (
        <div>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <h3>
                <button onClick={() => props.removeTodoList(props.id)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={getBtnClass("all")}
                    onClick={setAllFilterValue}>All
                </button>
                <button
                    className={getBtnClass("active")}
                    onClick={setActiveFilterValue}>Active
                </button>
                <button
                    className={getBtnClass("completed")}
                    onClick={setCompletedFilterValue}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;