import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import root from './reducers';


const configureStore = () => {
  const middlewares = [thunk, createLogger()];

  return createStore(
    root,
    applyMiddleware(...middlewares)
  );
}

export default configureStore;

