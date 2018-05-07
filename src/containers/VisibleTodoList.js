import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { getVisibileTodos } from '../reducers/rootReducer';
import TodoList from '../components/TodoList';
import { fetchTodos } from '../api';

class VisibileTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }


  /* componentDidUpdate
    render() 호출된 뒤에 발생하게 된다. 이 시점에서는 this.props 와 this.state가 변경된 후의 상태
    파라미터를 통해 이전의 값인 prevProps와 prevState를 조회 가능
    16.03 부터 getSnapshotBeforeUpdate 에서 반환한 snapshot 값은 세번째 파라미터로 받아온다.
    ex) componentDidUpdate(prevProps, prevState, snapshot) {}
   */
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const{ filter, receiveTodos, fetchTodos } = this.props;

    fetchTodos(filter)
      .then(todos =>
        receiveTodos(filter, todos)
      );
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return <TodoList
      {...rest}
      onTodoClick={toggleTodo}
    />;
  }
}

const mapStateToProps = (state, match) => {
  const filter = match.filter || 'all';
  return {
    todos: getVisibileTodos(state, filter),
    filter,
  }
};

export default connect(
  mapStateToProps,
  Actions
)(VisibileTodoList);