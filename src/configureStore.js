import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const configureStore = () => {
  const middlewares = [promise];
  middlewares.push(createLogger());
  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
}

export default configureStore;