import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
import App from './App';
import reducer from './rootReducers';

const con = (str) => {
  console.group('console');
  console.log(str);
  console.groupEnd();
}

const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    // 플레인 오브젝트인 액션을 받아서 reducer에게 전달해주고 그 reducer의 반환값을 전체 상태에 반영한 이후
    state = reducer(state, action);
    // 현재 등록된 리스너들을 호출함으로써 상태 변화를 알린다.
    listeners.forEach(listener => {
      listener()
    });
  };

  const subscribe = (listener) => {
    // 인자로 스토어의 상태가 변화한 이후의 콜백 함수를 받는다.
    listeners.push(listener);
    // 함수를 반환한 이유는 사용자에게 리스너를 취소할 수 있게 하기 위해서이다.

    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});
  return { getState, dispatch, subscribe };
}

const store = createStore(reducer);

const render = () => {
  con(store.getState());
  document.body.innerHTML = "<div>" + store.getState() + "</div>";
}

store.subscribe(render);

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
})

ReactDOM.render(
  <App
    store={store}
  />,
  document.getElementById('root')
);

// TODO counter Reducer Test Code
/*
expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect(
  counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'DECREMENT' })
).toEqual(0);

expect(
  counter(1, { type: 'SOMETHING_ELSE' })
).toEqual(1);

expect(
  counter(undefined, {})
).toEqual(0);
console.log('Tests passed!');
*/