import { combineReducers } from 'redux'

import user from './userReducer'
import story from './storyReducer'
import template from './templateReducer'

const createRootReducer = () => combineReducers({
  user,
  story,
  template
})

export default createRootReducer
