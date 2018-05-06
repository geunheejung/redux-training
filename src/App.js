import React from 'react';
import AddTodo from './containers/AddTodo';
import VisibileTodoList from './containers/VisibleTodoList';
import Footer from './components/Footer';

export default () => {
  return (
    <div>
      <AddTodo />
      <VisibileTodoList />
      <Footer />
    </div>
  );
}

