import { Alert } from 'react-native'
export const storyActionTypes = {
    FETCH_STORY_LIST_REQUEST: 'FETCH_STORY_LIST_REQUEST',
    FETCH_STORY_LIST_SUCCESS: 'FETCH_STORY_LIST_SUCCESS',
    FETCH_STORY_LIST_FAILURE: 'FETCH_STORY_LIST_FAILURE',
    LOAD_MORE_STORY_LIST_REQUEST: 'LOAD_MORE_STORY_LIST_REQUEST',
    LOAD_MORE_STORY_LIST_SUCCESS: 'LOAD_MORE_STORY_LIST_SUCCESS',
    LOAD_MORE_STORY_LIST_FAILURE: 'LOAD_MORE_STORY_LIST_FAILURE',
    
    TOGGLE_LIKE_STORY_REQUEST: 'TOGGLE_LIKE_STORY_REQUEST',
    TOGGLE_LIKE_STORY_SUCCESS: 'TOGGLE_LIKE_STORY_SUCCESS',
    TOGGLE_LIKE_STORY_FAILURE: 'TOGGLE_LIKE_STORY_FAILURE',
    CREATE_STORY_FAILURE: 'UPDATE_STORY_FAILURE',
    UPDATE_STORY_REQUEST: 'UPDATE_STORY_REQUEST',
    UPDATE_STORY_SUCCESS: 'UPDATE_STORY_SUCCESS',
    UPDATE_STORY_FAILURE: 'UPDATE_STORY_FAILURE',
}

const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case storyActionTypes.FETCH_STORY_LIST_REQUEST:
            state = [...defaultState]
            return state
        case storyActionTypes.FETCH_STORY_LIST_SUCCESS:
            
            state = [...action.payload]
            return state
        case storyActionTypes.FETCH_STORY_LIST_FAILURE:
            
            const message = action.payload.message
            Alert.alert('Error', message)
            return state
        case storyActionTypes.LOAD_MORE_STORY_LIST_REQUEST:
            state = [...defaultState]
            return state
        case storyActionTypes.LOAD_MORE_STORY_LIST_SUCCESS:
            
            const newStoryList = state.concat(action.payload)
            state = [...newStoryList]
            return state
        case storyActionTypes.LOAD_MORE_STORY_LIST_FAILURE:
            
            const message2 = action.payload.message
            Alert.alert('Error', message2)
            return state
        
        case storyActionTypes.COMMENT_STORY_FAILURE:
            
            const message3 = action.payload.message
            Alert.alert('Error', message3)
            return state
        case storyActionTypes.TOGGLE_LIKE_STORY_REQUEST:
            return state
        case storyActionTypes.TOGGLE_LIKE_STORY_SUCCESS:
            
            state = [...action.payload]
            return state
        case storyActionTypes.TOGGLE_LIKE_STORY_FAILURE:
            
            const message4 = action.payload.message
            Alert.alert('Error', message4)
            return state
        case storyActionTypes.UPDATE_STORY_REQUEST:
            return state
        case storyActionTypes.UPDATE_STORY_SUCCESS:
            
            const updatedStory = action.payload
            const storyList = state.map(story => {
                if (story.uid === updatedStory.uid) {
                    return { ...updatedStory }
                }
                return story
            })
            state = [...storyList]
            return state
        case storyActionTypes.UPDATE_STORY_FAILURE:
            
            Alert.alert('Error', action.payload.message)
            return state
        default:
            return state
    }
}
export default reducer