import * as Actions from '../actions';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case Actions.SET_VISIBILITY:
      return action.payload;
    default:
      return state;
  }
};

export default visibilityFilter;