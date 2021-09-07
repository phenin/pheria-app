import { Alert } from 'react-native'

export const LIMIT_COMMENTS_PER_LOADING = 10
export const commentActionTypes = {
    FETCH_COMMENTS_REQUEST: 'FETCH_COMMENTS_REQUEST',
    FETCH_COMMENTS_SUCCESS: 'FETCH_COMMENTS_SUCCESS',
    FETCH_COMMENTS_FAILURE: 'FETCH_COMMENTS_FAILURE',
    LOAD_MORE_COMMENTS_REQUEST: 'LOAD_MORE_COMMENTS_REQUEST',
    LOAD_MORE_COMMENTS_SUCCESS: 'LOAD_MORE_COMMENTS_SUCCESS',
    LOAD_MORE_COMMENTS_FAILURE: 'LOAD_MORE_COMMENTS_FAILURE',
    TOGGLE_LIKE_COMMENT_REQUEST: 'TOGGLE_LIKE_COMMENT_REQUEST',
    TOGGLE_LIKE_COMMENT_SUCCESS: 'TOGGLE_LIKE_COMMENT_SUCCESS',
    TOGGLE_LIKE_COMMENT_FAILURE: 'TOGGLE_LIKE_COMMENT_FAILURE',
    TOGGLE_LIKE_REPLY_REQUEST: 'TOGGLE_LIKE_REPLY_REQUEST',
    TOGGLE_LIKE_REPLY_SUCCESS: 'TOGGLE_LIKE_REPLY_SUCCESS',
    TOGGLE_LIKE_REPLY_FAILURE: 'TOGGLE_LIKE_REPLY_FAILURE',
    REPLY_COMMENT_REQUEST: 'REPLY_COMMENT_REQUEST',
    REPLY_COMMENT_SUCCESS: 'REPLY_COMMENT_SUCCESS',
    REPLY_COMMENT_FAILURE: 'REPLY_COMMENT_FAILURE',
    COMMENT_STORY_SUCCESS: 'COMMENT_STORY_SUCCESS',
    COMMENT_STORY_FAILURE: 'COMMENT_STORY_FAILURE',
    TOGGLE_SHOW_REPLIES_COMMENT_FAILURE: 'TOGGLE_SHOW_REPLIES_COMMENT_FAILURE',
    TOGGLE_SHOW_REPLIES_COMMENT_SUCCESS: 'TOGGLE_SHOW_REPLIES_COMMENT_SUCCESS'
}
const defaultState = {
  comments: [],
  total: 0,
  story: {},
  scrollDown: false
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case commentActionTypes.FETCH_COMMENTS_REQUEST:
            state = { ...defaultState }
            return state
        case commentActionTypes.FETCH_COMMENTS_SUCCESS:
            
            state = { ...action.payload }
            return state
        case commentActionTypes.FETCH_COMMENTS_FAILURE:
            
            const message = action.payload.message
            Alert.alert('Error', message)
            return state
        case commentActionTypes.LOAD_MORE_COMMENTS_REQUEST:
            state = { ...defaultState }
            return state
        case commentActionTypes.LOAD_MORE_COMMENTS_SUCCESS:
            
            state = {
                ...state, comments: [...state.comments,
                ...action.payload.comments],
                scrollDown: action.payload.scrollDown || false
            }
            return state
        case commentActionTypes.LOAD_MORE_COMMENTS_FAILURE:
            
            const message2 = action.payload.message
            Alert.alert('Error', message2)
            return state
        case commentActionTypes.COMMENT_STORY_FAILURE:
            
            const message6 = action.payload.message
            Alert.alert('Error', message6)
            return state
        case commentActionTypes.COMMENT_STORY_SUCCESS:
            
            state = {
                ...state,
                comments: [...action.payload.comments],
                total: state.total++
            }
            return state
        case commentActionTypes.TOGGLE_LIKE_COMMENT_REQUEST:
            state = state
            return state
        case commentActionTypes.TOGGLE_LIKE_COMMENT_SUCCESS:
            state = {
                ...state, 
                comments: [...action.payload.comments],
            }
            return state
        case commentActionTypes.TOGGLE_LIKE_COMMENT_FAILURE:
            
            const message3 = action.payload.message
            Alert.alert('Error', message3)
            return state
        case commentActionTypes.TOGGLE_LIKE_REPLY_REQUEST:
            state = state
            return state
        case commentActionTypes.TOGGLE_LIKE_REPLY_SUCCESS:
            
            state = {
                ...state, comments: [...action.payload.comments]
            }
            return state
        case commentActionTypes.TOGGLE_LIKE_REPLY_FAILURE:
            
            const message4 = action.payload.message
            Alert.alert('Error', message4)
            return state
        case commentActionTypes.REPLY_COMMENT_REQUEST:
            state = state
            return state
        case commentActionTypes.REPLY_COMMENT_SUCCESS:
            
            state = {
                ...state, comments: [...action.payload.comments]
            }
            return state
        case commentActionTypes.REPLY_COMMENT_FAILURE:
            
            const message5 = action.payload.message
            Alert.alert('Error', message5)
            return state
        case commentActionTypes.TOGGLE_SHOW_REPLIES_COMMENT_FAILURE:
            const message7 = action.payload.message
            Alert.alert('Error', message7)
            return state
        case commentActionTypes.TOGGLE_SHOW_REPLIES_COMMENT_SUCCESS: 
            state = {
                ...state, comments: [...action.payload.comments]
            }
            return state
        default:
            return state
    }
}
export default reducer