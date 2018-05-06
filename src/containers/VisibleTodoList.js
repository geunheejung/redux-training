import React, { Component } from 'react';
import * as Actions from '../actions';
import TodoList from '../components/TodoList';
import PropTypes from 'prop-types';

class VisibileTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {

    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    const getVisibleTodos = (
      todos,
      filter
    ) => {
      switch (filter) {
        case 'SHOW_ALL':
          return todos;
        case 'SHOW_COMPLETED':
          return todos.filter(
            t => t.completed
          );
        case 'SHOW_ACTIVE':
          return todos.filter(
            t => !t.completed
          );
        default:
          return todos;
      }
    }

    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch(Actions.toggleTodo(id))
        }
      />
    );
  }
}

VisibileTodoList.contextTypes = {
  store: PropTypes.object
}

export default VisibileTodoList;