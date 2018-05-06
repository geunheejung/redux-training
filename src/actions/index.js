import uuidV4 from 'uuid-v4';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY = 'SET_VISIBILITY';

export const addTodo = (value) => ({ type: ADD_TODO, payload: value, id: uuidV4() });
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, id });

