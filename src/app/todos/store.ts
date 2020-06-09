import {
    FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_ERROR,
    ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_ERROR,
    CHECK_TODO_REQUEST,
    REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS, REMOVE_TODO_ERROR,
    DELETE_TODOS_REQUEST, DELETE_TODOS_SUCCESS, DELETE_TODOS_ERROR } from './actions';
import { tassign } from 'tassign';
import { Todo } from './todo.interface';
const moment = require('moment');

export interface ITodoState {
    todos: Todo[];
    lastUpdate: number;
}

export const TODO_INITIAL_STATE: ITodoState = {
    todos: [],
    lastUpdate: null
};

function addTodo(state: ITodoState, action, time) {
    const newTodo: Todo = { id: time, content: action.body, isChecked: false };
    return tassign(state, { todos: state.todos.concat(newTodo), lastUpdate: time });
}

function removeTodo(state: ITodoState, action, time) {
    const newTodosState = state.todos.filter(todo => todo.content !== action.body);
    return tassign(state, { todos: newTodosState, lastUpdate: time });
}

function checkTodo(state: ITodoState, action, time) {
    const newTodosState = state.todos.map(todo => {
        if (todo.content === action.body) {
            const newTodo = todo;
            newTodo.isChecked = !todo.isChecked;
            return newTodo;
        }
        return todo;
    });
    return tassign(state, { todos: newTodosState, lastUpdate: time });
}

function deleteTodos(state: ITodoState, action, time) {
    return tassign(state, { todos: [], lastUpdate: time });
}

function updateTodoId(state: ITodoState, action, time) {
    const newTodosState = state.todos.map(todo => {
        if (todo === action.body) {
            const updatedTodo = todo;
            updatedTodo.id = action.body.id;
            return updatedTodo;
        }
        return todo;
    });
    return tassign(state, { todos: newTodosState, lastUpdate: time });
}

// Potentially could be moved
function currentTime() {
    return moment().format('h:mm:ss A');
}

export function todoReducer(state: ITodoState = TODO_INITIAL_STATE, action) {
    const updateTime = currentTime();

    switch (action.type) {
        case ADD_TODO_REQUEST: return addTodo(state, action, updateTime);
        case ADD_TODO_SUCCESS: return updateTodoId(state, action, updateTime);
        case ADD_TODO_ERROR: return; // Return last ADD_TODO_REQUEST action

        case REMOVE_TODO_REQUEST: return removeTodo(state, action, updateTime);
        case REMOVE_TODO_SUCCESS: return updateTodoId(state, action, updateTime);
        case REMOVE_TODO_ERROR: return; // Return last REMOVE_TODO_REQUEST action

        case CHECK_TODO_REQUEST: return checkTodo(state, action, updateTime);

        case DELETE_TODOS_REQUEST: return deleteTodos(state, action, updateTime);
        case DELETE_TODOS_SUCCESS: return updateTodoId(state, action, updateTime);
        case DELETE_TODOS_ERROR: return; // Return last DELETE_TODOS_REQUEST action

        default: return state;
    }
}
