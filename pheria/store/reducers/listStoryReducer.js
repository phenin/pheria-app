import * as ActionTypes from '../actionTypes'

const initialState = {
    listStory: [],
    loading: false,
    error: null
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LIST_STORY_ERROR:
        case ActionTypes.LIST_STORY_START:
        case ActionTypes.GET_LIST_STORY_SUCCESS:
            return {
                ...state, ...action.payload
            };

        default:
            return state;
    }
}

export default reducer