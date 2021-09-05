import { Alert } from 'react-native'

export const userActionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
}
export const defaultUserState = {
    user: {},
    photos: [],
    tagPhotos: [],
    taggedPhotos: [],
    bookmarks: [],
    highlights: [],
    archive: {
        stories: [],
        posts: []
    },
    setting: {
        notification: {
            notificationAccounts: {
                posts: [],
                story: []
            },
            
        },
        privacy: {
            
        }
    },
    extraInfo: {
        unSuggestList: [],
        requestedList: [],
        posts: 0,
        followers: [],
        followings: [],
    },
    currentStory: []
}
const reducer = (state = defaultUserState, action) => {
    switch (action.type) {
        case userActionTypes.LOGIN_REQUEST:
            state = { ...state, user: {} }
            return state
        case userActionTypes.LOGIN_SUCCESS:
            
            state = { ...state, user: { ...action.payload.user } }
            return state
        case userActionTypes.LOGIN_FAILURE:
            
            const message = action.payload.message
            Alert.alert('Error', message)
            return state
        case userActionTypes.LOGOUT_SUCCESS:
            return { user: {} }
        case userActionTypes.LOGOUT_FAILURE:
            
            Alert.alert('Error', action.payload.message)
            return state
        case userActionTypes.REGISTER_REQUEST:
            state = { ...state, user: {} }
            return state
        case userActionTypes.REGISTER_SUCCESS:
            
            state = { ...state, user: { ...action.payload.user } }
            return state
        case userActionTypes.REGISTER_FAILURE:
            
            const message2 = action.payload.message
            Alert.alert('Error', message2)
            return state
        default:
            return state
    }
}
export default reducer