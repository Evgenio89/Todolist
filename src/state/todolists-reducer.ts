import {FilterValuesType, TodolistType} from "../App"
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string

}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}


export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsTypes)  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            /*const changeTodolist = state.find(tl =>tl.id === action.id);
            if(changeTodolist) {
                changeTodolist.title = action.title;
            }
            return [...state]*/
           return  state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl =>tl.id === action.id);
            if(todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return  {
        type: 'ADD-TODOLIST',
        title: title
    }
}

export const ChangeTodolistTitleAC = (title: string, todolistId: string ): ChangeTodolistTitleActionType => {
     return {
            type: 'CHANGE-TODOLIST-TITLE',
            id: todolistId,
            title: title
    }
}

export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string ): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: filter
    }
}

