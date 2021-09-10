export const userXActionTypes = {
    FETCH_PROFILEX_SUCCESS: 'FETCH_PROFILEX_SUCCESS',
    FETCH_PROFILEX_FAILURE: 'FETCH_PROFILEX_FAILURE'
}

export const defaultUserState = {

}
const reducer = (state = defaultUserState, action) => {
    switch (action.type) {
        case userXActionTypes.FETCH_PROFILEX_SUCCESS:
            state = { ...action.payload }
            return state
        default:
            return state
    }
}
export default reducer