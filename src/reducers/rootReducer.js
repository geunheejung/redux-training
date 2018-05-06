import { combineReducers } from 'redux';
import todoReducer, * as fromTodos from './todoReducer';

const rootRedcuer = combineReducers({
  todos: todoReducer,
});

export const getVisibileTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);

export default rootRedcuer;