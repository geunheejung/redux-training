import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import visibilityFilterReducer from './visibilityFilterReducer';

const rootRedcuer = combineReducers({
  todos: todoReducer,
  visibilityFilter: visibilityFilterReducer
});

export default rootRedcuer;