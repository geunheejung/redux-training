import React from 'react';
import * as Actions from '../actions';
import PropTypes from 'prop-types';

const AddTodo = (props, { store }) => {
  let input;

  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
        type="text"
      />
      <button
        onClick={() => {
          store.dispatch(Actions.addTodo(input.value));
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

AddTodo.contextTypes = {
  store: PropTypes.object
}

export default AddTodo;