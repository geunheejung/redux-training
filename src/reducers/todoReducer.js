import * as Actions from '../actions';
import uuidV4 from 'uuid-v4';

const todo = (state, action) => {
  switch (action.type) {
    case Actions.ADD_TODO:
      return {
        id: action.id,
        text: action.payload,
        completed: false
      }
    case Actions.TOGGLE_TODO:
      if (state.id !== action.payload) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case Actions.ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ];
    case Actions.TOGGLE_TODO:
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
};

export default todos;