import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

// Create
// Read
// Update
// Delete
// CRUD
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all"|"active"|"completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type  TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodolist] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: false},
        ]
    })

    //BLL:
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        const updatedTodoList = todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl)
        setTodolist(updatedTodoList)
    }
    const removeTask = (taskID: string, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(copyState)
    }
    const addTask = (newTaskTitle: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        const copyState = {...tasks}
        copyState[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyState)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone}: t)
        setTasks(copyState)
    }
    const removeTodoList = (todoListID: string) => {
        setTodolist(todoLists.filter(tl => tl.id !== todoListID))
    }


    const todoListComponents = todoLists.map(tl => {
        let tasksForRender = tasks[tl.id]
        if(tl.filter === "active"){
            tasksForRender = tasksForRender.filter(t=> !t.isDone)
        }
        if(tl.filter === "completed"){
            tasksForRender = tasksForRender.filter(t=> t.isDone)
        }
        return(
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        )
    })
    //UI:
    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
