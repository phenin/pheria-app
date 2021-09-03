import { combineReducers } from 'redux'
import {
    useSelector as useReduxSelector,
} from 'react-redux'
import userReducer from './userReducer'

const rootReducer = combineReducers<AppState>({
  user: userReducer,
})
export const useSelector = useReduxSelector
export default rootReducer