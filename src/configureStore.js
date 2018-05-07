import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

// Redux api인 createStore의 2번째 param 자리는 redux 상태의 초기값을 정할 수 있다.
// store의 2번째 인자는 reducer의 초기 상태를 정할 수 있다. 이후 각 reducer마다의 상태는
// 초기상태로 정해진 persistedState에 override된다.

const addLoggingTodoDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(`%c ---------- ${action.type} ----------`, 'color: lightblue;');
    console.log('%c 이전 상태', 'color: gray', store.getState());
    console.log('%c 액션', 'color: blue', action);
    console.log('%c 다음 상태', 'color: green', store.getState());
    console.groupEnd();
    console.log(`--------------------`);
    const returnValue = rawDispatch(action);
    return returnValue;
  };
}

const configureStore = () => {
  const store = createStore(
    rootReducer,
  );

  store.dispatch = addLoggingTodoDispatch(store);

  return store;
}




export default configureStore;