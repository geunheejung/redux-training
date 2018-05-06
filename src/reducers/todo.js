import * as Actions from '../actions';

const todo = (state, action) => {
  switch (action.type) {
    case Actions.ADD_TODO:
      return {
        id: action.id,
        text: action.payload,
        completed: false
      }
    case Actions.TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

export default todo;