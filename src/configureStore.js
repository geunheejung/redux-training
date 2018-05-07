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

  return (action, type) => {
    console.log('type !!!:', type);
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

const addPromiseSupportToDispatch = (store) => {
  // 이미 store.dispatch는 위의 addLoggingTodoDispatch로 override되어있는 상태
  const rawDispatch = store.dispatch;

  // Redux의 action은 plainObject만 허용하기에 만약 action이 비동기인 promise객체이며 promise.then 메서드가 존재할 경우 한번 더 함수인 액션을 디스패치하여 객체로 만듬
  return (action) => {
    console.log(action);
    if (typeof action.then === 'function') {
      // 액션 타입이 함수로 올 경우 한번 더 디스패치해줘서 plian object로 변경해줌
      return action.then(res => {
        // action으로 받은 promise에 대한 then 즉 api.fetchTodos Promise가 then에 의해 성공적으로 resolve값을 반환했을 때의 then이며 res를 디스패치하였는데 또 액션이 함수이면 다시 반복 함수가 아니면 올바르게 디스패치함으로써 끝
        console.log('res ::', res);
        return rawDispatch(res, 'actionType Function')
      });
    }
    return rawDispatch(action, 'actionType Obejct');
  };
};

const configureStore = () => {
  const store = createStore(
    rootReducer,
  );

  store.dispatch = addLoggingTodoDispatch(store);
  store.dispatch = addPromiseSupportToDispatch(store);

  return store;
}




export default configureStore;