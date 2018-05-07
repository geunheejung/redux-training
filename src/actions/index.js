import uuidV4 from 'uuid-v4';
import * as api from '../api';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';


export const addTodo = (value) => ({ type: ADD_TODO, payload: value, id: uuidV4() });
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, id });

export const receiveTodos = (filter, response) => ({ type: RECEIVE_TODOS, filter, response, });

export const fetchTodos = (filter) => {
  return api.fetchTodos(filter).then(res => {
    return receiveTodos(filter, res);
  });
}
