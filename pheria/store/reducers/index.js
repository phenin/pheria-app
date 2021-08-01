import { combineReducers } from 'redux'

import user from './userReducer'
import story from './storyReducer'
import listStory from './listStoryReducer'
import template from './templateReducer'
import groupTemplate from './groupTemplateReducer'
import background from './backgroundReducer'

const createRootReducer = () => combineReducers({
  user,
  story,
  listStory,
  template,
  groupTemplate,
  background
})

export default createRootReducer
