import uuidV4 from 'uuid-v4';
import * as api from '../api';
import { getIsFetching } from '../reducers';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REQUEST_TODOS = 'REQUEST_TODOS';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';


export const addTodo = (value) => ({ type: ADD_TODO, payload: value, id: uuidV4() });

export const toggleTodo = (id) => ({ type: TOGGLE_TODO, id });

const requestTodos = (filter) => ({ type: REQUEST_TODOS, filter });

const receiveTodos = (filter, response) => ({ type: RECEIVE_TODOS, filter, response, });

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return;
  }

  dispatch(requestTodos(filter));
  return api.fetchTodos(filter).then(res => {
    dispatch(receiveTodos(filter, res));
  });
};
