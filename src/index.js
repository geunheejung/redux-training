import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);



//TODO Provider 구현
/*
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store //props으로 받은 store를 전달해주는 역할
    }
  }

  render() {
    return this.props.children;
  }
}
*/
// // TODO toogle Test Code
/*
const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false
    },
  ];

  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: true
    },
  ]

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}
testToggleTodo();

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};
testAddTodo();
console.log('All tests passed');
*/

// // TODO 불변 테스트 코드
/*
const addCounter = (list) => {
  // list.push(0);
  // return list.concat([0]);
  return [...list, 0];
}

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

testAddCounter();
console.log('All tests passed');

const removeCounter = (list, index) => {
  // list.splice(index, 1);
  // return list;
  console.log(index);
  console.log(list.slice(0,index));
  console.log(list.slice(index + 1));
  // return list.slice(0, index).concat(list.slice(index + 1));
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
}

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};
testRemoveCounter();
console.log('removeArr Test passed');

const incrementCounter = (list, index) => {
  // list[index]++;
  // return list;

  console.log(list.slice(index, 1));
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ]

};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
}
testIncrementCounter();
*/

// // TODO Redux createStore 구현
/*
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
*/

// // TODO counter Reducer Test Code
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

// TODO combineReducers 구현
/*
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers)
      .reduce((nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      }, {})
  };
}
*/

// TODO root Reducer 컴포지션
/*
const todoApp = (state = {}, action) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  };
};
*/

