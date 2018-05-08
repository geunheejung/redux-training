import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { getVisibleTodos, getIsFetching } from '../reducers';
import TodoList from '../components/TodoList';
import { fetchTodos } from '../api';

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
    const{ filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, isFetching } = this.props;

    if (isFetching && !todos.lnegth) {
      return <p>Lodding...</p>;
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
    isFetching: getIsFetching(state, filter),
    filter,
  }
};

export default connect(
  mapStateToProps,
  Actions
)(VisibileTodoList);