import { combineReducers } from 'redux'
import {
    useSelector as useReduxSelector,
} from 'react-redux'
import userReducer from './userReducer'
import storyReducer from './storyReducer'

const rootReducer = combineReducers({
  user: userReducer,
  storyList: storyReducer
})
export const useSelector = useReduxSelector
export default rootReducer