import * as ActionTypes from '../actionTypes'

const initialState = {
    listGroupTemplate: [],
    groupTemplate: null,
    loading: false,
    error: null
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GROUPTEMPLATE_ERROR:
        case ActionTypes.GROUPTEMPLATE_START:
        case ActionTypes.GET_LIST_GROUPTEMPLATE_SUCCESS:
        case ActionTypes.SET_GROUPTEMPLATE:
            return {...state, ...action.payload};
            
        default:
            return state;
    }
}

export default reducer
