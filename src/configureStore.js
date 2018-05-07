import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

// Redux api인 createStore의 2번째 param 자리는 redux 상태의 초기값을 정할 수 있다.
// store의 2번째 인자는 reducer의 초기 상태를 정할 수 있다. 이후 각 reducer마다의 상태는
// 초기상태로 정해진 persistedState에 override된다.

const logger = (store) => (next) => {
  if (!console.group) {
    return next;
  }

  return (action) => {

    console.group(`%c ---------- ${action.type} ----------`, 'color: lightblue;');
    console.log('%c 이전 상태', 'color: gray', store.getState());
    console.log('%c 액션', 'color: blue', action);
    console.log('%c 다음 상태', 'color: green', store.getState());
    console.groupEnd();
    console.log(`--------------------`);
    const returnValue = next(action);
    return returnValue;
  };
}

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};


const warpDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware =>
    // curry로 store.dispatch를 전달해준 이유는 인수 변경을 어렵게하기 위
    store.dispatch = middleware(store)(store.dispatch)
  );
}

const configureStore = () => {
  const store = createStore(rootReducer);
  // store.dispatch api를 override하지 않고 middlewares 라는 배열을 굳이 만든 이유는 본래 제공하는 api를 override해서 사용하는것은 안좋기 때문이다. override로 인해 다른 곳의 기능이 망가질 수 있음.

  const middlewares = [promise];
  // 기존에는 logger 를 override하고 그 다음에 promise를 override하는 코드를 배치하였는데 굳이 promise를 먼저 배치하고 middlewares 함수에서 reverse 해서 사용하는 이유는 Action이 미들웨어에 전파되는 순서를 지정하는 것이 더 자연스럽기 때문이다. 사용자가 Action을 디스패칭했을 때 logger 미들웨어를 만나기전에 promise 미들웨어를 먼저 만나기 때문이다.


  middlewares.push(logger);

  // 각 Middleware를 배열로 만들고, warpDispatchWithMiddlewares라는 미들웨어를 다루는 함수를 새로 만듬으로써 configureStore 를 declarative(선언적) 으로 유지가능합니다.

  // 미들웨어는 Action이 Reducer에 도달하기 전에 Custom 정의 동작을 넣을 수 있는 강력한 시스템이다. Logger, error 처리, 비동기처리 등과 같디 다양한 목적으로 사용 가능
  warpDispatchWithMiddlewares(store, middlewares);

  return store;
}


export default configureStore;