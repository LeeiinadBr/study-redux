import { ITodoState, todoReducer, TODO_INITIAL_STATE } from './todos/store';
import { combineReducers } from 'redux';

export interface IAppState {
    todoState: ITodoState;
    
}

export const INITIAL_STATE: IAppState = {
    todoState: TODO_INITIAL_STATE
};

export const rootReducer = combineReducers({
    todoState: todoReducer,

});
