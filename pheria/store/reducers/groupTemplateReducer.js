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
        case ActionTypes.SET_GROUPTEMPLATE:
            return {...state, ...action.payload};
        case ActionTypes.GET_LIST_GROUPTEMPLATE_SUCCESS:
            let listGroupTemplate = [
                {
                    _id: 'background',
                    name: 'Background'
                },
                {
                    _id: 'text',
                    name: 'Text'
                },
                ...action.payload.listGroupTemplate
            ]
            return {...state, listGroupTemplate, loading: action.payload.loading};
        default:
            return state;
    }
}

export default reducer
