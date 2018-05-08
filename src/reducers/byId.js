import * as Actions from '../actions';

const byId = (state = {}, action) => {
  switch (action.type) {
    case Actions.FETCH_TODO_SUCCESS:
      const nextState = { ...state };

      action.response.forEach((todo) => {
        nextState[todo.id] = todo;
      });
      return nextState;
    case Actions.ADD_TODO_SUCCESS:
      return {
        ...state,
        [action.response.id]: action.response
      }
    default:
      return state;
  }
};

export default byId;

export const getTodo = (state, id) => state[id];