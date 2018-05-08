import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import root from './reducers';


const configureStore = () => {
  const middlewares = [thunk, createLogger()];

  return createStore(
    root,
    applyMiddleware(...middlewares)
  );
}

export default configureStore;

// Redux-Thunk 미들웨어 구현
// action이 함수일 경우 dispatch와 getState를 인자로 하여 action을 한번 더 호출해줘서 리듀서가 원하는 플레인 오브젝트가 될때까지 반복
// const thunk = (store) => (next) => (action) =>
//   typeof action === 'function'
//     ? action(store.dispatch, store.getState)
//     : next(action);
