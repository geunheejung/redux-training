import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import TodoList from '../components/TodoList';
import FetchError from '../components/FetchError';

class VisibileTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, errorMessage, isFetching } = this.props;

    if (isFetching && !todos.lnegth) {
      return <p>Lodding...</p>;
    }
    if (errorMessage&& !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }
    return <TodoList
      todos={todos}
      onTodoClick={toggleTodo}
    />;
  }
}

const mapStateToProps = (state, match) => {
  const filter = match.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  }
};

export default connect(
  mapStateToProps,
  Actions
)(VisibileTodoList);