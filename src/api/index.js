import uuidV4 from 'uuid-v4';

const fakeDatabase = {
  todos: [
    {
      id: uuidV4(),
      text: 'geuni',
      completed: true,
    },
    {
      id: uuidV4(),
      text: 'sky',
      completed: true,
    },
    {
      id: uuidV4(),
      text: 'yangme',
      completed: false,
    }
  ]
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    if (Math.random() > 0.5) {
      throw new Error('Boom!');
    }

    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(
          t => !t.completed
        );
      case 'completed':
        return fakeDatabase.todos.filter(
          t => t.completed
        );
      default:
        throw new Error(`UnKnown filter: ${filter}`);
    }
  });

export const addTodo = text =>
  delay(500).then(() => {
    const todo = {
      id: uuidV4(),
      text,
      completed: false,
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });

export const toggleTodo = id =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  })