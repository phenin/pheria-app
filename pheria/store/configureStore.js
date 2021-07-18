import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import createRootReducer from './reducers'

const configureStore = () => {
  let middlewares = [thunkMiddleware]

  const middlewareEnhancer = applyMiddleware(...middlewares)

  let enhancers = [middlewareEnhancer]

  const composedEnhancers = compose(...enhancers)

  const store = createStore(createRootReducer(), composedEnhancers)

  return store
}

export default configureStore
