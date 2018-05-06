import { combineReducers } from 'redux';
import * as Actions from '../actions';
import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    case Actions.ADD_TODO:
    case Actions.TOGGLE_TODO:
      // 실제 DB 처럼 고유한 id를 Key값으로 하여 다른 데이터에 접근하거나 자기 자신에게 접근할 수 있게 정규화됨.
      ;
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    default:
      return state;
  }
};

// todo의 id들을 Array형태로 모두 모은 이유는 Object인 Todos데이터를 다룰때 용이하기 때문입니다.
const allIds = (state = [], action) => {
  switch (action.type) {
    case Actions.ADD_TODO:
      return [...state, action.id];
    default:
      return state;
  }
};

// Reducer 조합은 무조건 rootReducer가 아니여도 subReducer에서도 조합이 가능합니다.
const todos = combineReducers({
  byId,
  allIds,
});

export default todos;

/* Selector
- Selector인 이유 : Object인 todos와 allTodoids 이 두 데이터를 계산하여서 렌더를 위한 todos 데이터를 만듦.
  즉 Store의 상태의 일부분을 선택하여 그 데이터끼리 계산한 데이터를 내뱉는 함수.
- [get]___ : Reducer 파일 안에서 get을 prefix로 한 function은 selector를 칭합니다.
 */

const getAllTodoIds = (state) =>
  state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodoIds(state);

  switch (filter) {
    case 'all':
      return allTodos;
    case 'completed':
      return allTodos.filter(t => t.completed);
    case 'active':
      return allTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
}
