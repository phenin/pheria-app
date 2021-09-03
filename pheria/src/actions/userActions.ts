import { userActionTypes } from '../reducers/userReducer';

export const LoginRequest = (user) => {
    return (dispatch) => {
        return 
    }
}
export const LoginFailure = () => {
    return {
        type: userActionTypes.LOGIN_FAILURE,
        payload: {
            message: 'Login Failed!'
        }
    }
}
export const LoginSuccess = (payload) => {
    return {
        type: userActionTypes.LOGIN_SUCCESS,
        payload: payload
    }
}
export const LogoutRequest = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: userActionTypes.LOGOUT_SUCCESS,
                payload: {}
            })
        } catch (e) {
            dispatch({
                type: userActionTypes.LOGOUT_FAILURE,
                payload: {
                    message: 'Can not logout now!'
                }
            })
        }
    }
}
export const RegisterRequest = (userData) => {
    return (dispatch => {
        return 
            
    }
}
export const RegisterFailure = (e) => {
    return {
        payload: {
            message: e
        },
        type: userActionTypes.REGISTER_FAILURE
    }
}