import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const AddTodo = ({ addTodo }) => {
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
          addTodo(input.value);
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addTodo: (value) => dispatch(Actions.addTodo(value))
});

export default connect(
  null,
  mapDispatchToProps
)(AddTodo);