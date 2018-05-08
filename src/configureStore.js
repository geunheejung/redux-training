import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import root from './reducers';

const configureStore = () => {
  const middlewares = [promise, createLogger()];

  return createStore(
    root,
    applyMiddleware(...middlewares)
  );
}

export default configureStore;