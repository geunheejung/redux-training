import * as api from '../api';
import { getIsFetching } from '../reducers';

export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const TOGGLE_TODO_SUCCESS = 'TOGGLE_TODO_SUCCESS';
export const FETCH_TODO_REQUEST = 'FETCH_TODO_REQUEST';
export const FETCH_TODO_FAILURE = 'FETCH_TODO_FAILURE';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';

export const addTodo = text => dispatch =>
  api.addTodo(text).then(response => {
    dispatch({
      type: ADD_TODO_SUCCESS,
      response
    })
  });

export const toggleTodo = id => dispatch =>
  api.toggleTodo(id).then(response =>
    dispatch({
      type: TOGGLE_TODO_SUCCESS,
      response
    })
  );

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: FETCH_TODO_REQUEST,
    filter
  });

  // api에 대한 error 체크를 .catch메서드가아닌 2번째 인자로 처리한 이유는 catch로 할 경우 임의로 then의 resolve 콜백에서 throw error를 던질 시 메세지가 변경되기 때문이다.
  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: FETCH_TODO_SUCCESS,
        filter,
        response,
      });
    },
    error => {
      dispatch({
        type: FETCH_TODO_FAILURE,
        filter,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};
