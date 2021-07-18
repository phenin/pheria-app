import * as ActionTypes from '../actionTypes'

const initialState = {
    listStory: [],
    story: null,
    loading: false,
    error: null
}

function reducer(state = initialState, action) {
    switch (action.type) {
      case ActionTypes.STORY_ERROR:
      case ActionTypes.STORY_START:
      case ActionTypes.GET_LIST_STORY_SUCCESS:
      case ActionTypes.GET_DETAIL_STORY_SUCCESS:
      case ActionTypes.SET_STORY:
      case ActionTypes.CREATE_STORY_SUCCESS:
      case ActionTypes.UPDATE_STORY_SUCCESS:
      case ActionTypes.DELETE_STORY_SUCCESS:
          return {...state, ...action.payload};
            
        default:
            return state;
    }
}

export default reducer
