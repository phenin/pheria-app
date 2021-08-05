import * as ActionTypes from '../actionTypes'

const initialState = {
    listBackground: [],
    background: null,
    loading: false,
    error: null
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.BACKGROUND_ERROR:
        case ActionTypes.BACKGROUND_START:
        case ActionTypes.GET_LIST_BACKGROUND_SUCCESS:
        case ActionTypes.SET_BACKGROUND:
            return {
                ...state, ...action.payload
            };

        default:
            return state;
    }
}

export default reducer