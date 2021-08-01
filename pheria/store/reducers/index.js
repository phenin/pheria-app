import { combineReducers } from 'redux'

import user from './userReducer'
import story from './storyReducer'
import template from './templateReducer'
import groupTemplate from './groupTemplateReducer'
import background from './backgroundReducer'

const createRootReducer = () => combineReducers({
  user,
  story,
  template,
  groupTemplate,
  background
})

export default createRootReducer
