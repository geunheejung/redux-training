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
  delay(5000).then(() => {
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
