import * as ActionTypes from '../actionTypes'

const initialState = {
    token: null,
    user: null,
    loading: false,
    error: null
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.USER_ERROR:
        case ActionTypes.USER_START:
        case ActionTypes.LOGIN_SUCCESS:
        case ActionTypes.SIGNUP_SUCCESS:
        case ActionTypes.GET_USER_SUCCESS:
            return {
                ...state, ...action.payload
            };

        default:
            return state;
    }
}

export default reducer