import * as Actions from '../actions';

const byId = (state = {}, action) => {
  switch (action.type) {
    case Actions.RECEIVE_TODOS:
      const nextState = { ...state };

      action.response.forEach((todo) => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

export default byId;

export const getTodo = (state, id) => state[id];