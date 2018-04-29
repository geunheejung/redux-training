import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import expect from 'expect';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// const render = () => {
//   document.body.innerHTML = "<div>" + store.getState() +"</div>";
// }

// store.subscribe(render);
//
// document.addEventListener('click', () => {
//   store.dispatch({ type: 'INCREMENT' });
// })

ReactDOM.render(<App/>, document.getElementById('root'));
// render();

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