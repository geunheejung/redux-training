import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddTodo from './containers/AddTodo';
import VisibileTodoList from './containers/VisibleTodoList';
import Footer from './components/Footer';

export default ({ match }) => {
  return (
    <div>
      <AddTodo />
      <VisibileTodoList
        filter={match.params.filter}
      />
      <Footer />


    </div>
  );
}

