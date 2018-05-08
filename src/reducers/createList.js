import { combineReducers } from 'redux';
import * as Actions from '../actions';

const createList = (filter) => {
  const ids = (state = [], action) => {
    switch (action.type) {
      case Actions.FETCH_TODO_SUCCESS:
        return action.filter === filter
          ? action.response.result
          : state;
      case Actions.ADD_TODO_SUCCESS:
        return filter !== 'completed'
          ? [...state, action.response.result]
          : state;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case Actions.FETCH_TODO_REQUEST:
        return true;
      case Actions.FETCH_TODO_SUCCESS:
      case Actions.FETCH_TODO_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }

    switch (action.type) {
      case Actions.FETCH_TODO_FAILURE:
        return action.message;
      case Actions.FETCH_TODO_REQUEST:
      case Actions.FETCH_TODO_SUCCESS:
        return null;
      default:
        return null;
    }
  }

  // 슬라이스리듀서중 하나인 listByFilter를 또 comgineReduers로 나눠서 ids와 isFetching을 분리함
  // 이로써 isFetching은 api에 관한 상태값만을 변경하고, ids는 서버의 res값만 신경씀
  return combineReducers({
    ids,
    isFetching,
    errorMessage
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;