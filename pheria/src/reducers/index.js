import { combineReducers } from 'redux'
import {
    useSelector as useReduxSelector,
} from 'react-redux'
import userReducer from './userReducer'
import storyReducer from './storyReducer'
import commentReducer from './commentReducer'
import profileXReducer, { ProfileX } from './profileXReducer'

const rootReducer = combineReducers({
  user: userReducer,
  storyList: storyReducer,
  comment: commentReducer,
  profileX: profileXReducer,
})
export const useSelector = useReduxSelector
export default rootReducer