import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

export  type TodolistType = {
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
        ],


    })

    //BLL:
    const changeTitle = (filter: FilterValuesType, title: string, todoListID: string) => {
        const updatedTodoList = todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        setTodolist(updatedTodoList)
    }
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
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title}: t)
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

    const  addTodolist = (title: string) => {
        const newTodo: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolist([...todoLists , newTodo])
        setTasks({...tasks, [newTodo.id]: []})
    }
    const changeTodolistTitle = (title: string, todoListID: string) => {
        const updatedTodoList = todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        setTodolist(updatedTodoList)
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
            <Grid item key={tl.id}>
            <Paper  elevation={8} style={{padding: '20px'}}>
            <TodoList
                id={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle ={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
            </Paper>
            </Grid>
        )
    })
    //UI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color='inherit' variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    style={{padding: '20px 0'}}
                >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
