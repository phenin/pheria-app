import { combineReducers } from 'redux'
import {
    useSelector as useReduxSelector,
} from 'react-redux'
import userReducer from './userReducer'
import storyReducer from './storyReducer'
import commentReducer from './commentReducer'

const rootReducer = combineReducers({
  user: userReducer,
  storyList: storyReducer,
  comment: commentReducer,
})
export const useSelector = useReduxSelector
export default rootReducer