import { combineReducers } from 'redux';
import * as Actions from '../actions';

const createList = (filter) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case Actions.RECEIVE_TODOS:
        return action.response.map(todo => todo.id);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case Actions.REQUEST_TODOS:
        return true;
      case Actions.RECEIVE_TODOS:
        return false;
      default:
        return state;
    }
  };

  // 슬라이스리듀서중 하나인 listByFilter를 또 comgineReduers로 나눠서 ids와 isFetching을 분리함
  // 이로써 isFetching은 api에 관한 상태값만을 변경하고, ids는 서버의 res값만 신경씀
  return combineReducers({
    ids,
    isFetching
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;