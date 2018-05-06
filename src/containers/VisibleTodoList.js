import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { getVisibileTodos } from '../reducers/rootReducer';
import TodoList from '../components/TodoList';


class VisibileTodoList extends Component {
  render() {
    const { todos, toggleTodo } = this.props;
    return (
      <TodoList
        todos={todos}
        onTodoClick={id =>
          toggleTodo(id)
        }
      />
    );
  }
}

const mapStateToProps = (state, { filter }) => ({
  todos: getVisibileTodos(state, filter || 'all'),
});

const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => dispatch(Actions.toggleTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VisibileTodoList);