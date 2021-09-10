import { userXActionTypes } from '../reducers/profileXReducer';

import {
    fetchUserX
}  from '../api/user'

export const FetchProfileXRequest = (name) => {
    return async (dispatch) => {
        fetchUserX(name).then(res => {
            if(res.data){
                dispatch(FetchProfileXSuccess(res.data))
            }
            else{
                dispatch(FetchProfileXFailure())
            }
        })
        .catch(e =>{
            dispatch(FetchProfileXFailure())
        })
    }
}
export const ResetProfileXRequest = () => {
    return async (dispatch) => {
        dispatch(FetchProfileXSuccess({}))
    }
}
export const FetchProfileXFailure = () => {
    return {
        type: userXActionTypes.FETCH_PROFILEX_FAILURE,
        payload: {
            message: `This profile doesn't exists`
        }
    }
}
export const FetchProfileXSuccess = (payload) => {
    return {
        type: userXActionTypes.FETCH_PROFILEX_SUCCESS,
        payload: payload
    }
}