import { userActionTypes } from '../reducers/userReducer';
import {
    fetchLoginByGG,
    fetchLogin,
    fetchSignUp,
    fetchUser,
    fetchUserListStory,
    fetchMyListStory,
    fetchUpdateUser
}  from '../api/user'
import { getToken, setToken } from "../utils/util"

export const LoginRequest = (params) => {
    return (dispatch) => {
        fetchLogin(params).then(rs => {
            console.log(rs.data)
            if(rs.data){
                setToken("accessToken", rs.data.token.accessToken);
                setToken("refreshToken", rs.data.token.refreshToken);
                fetchUser().then(res => {
                    const user = {
                        logined: true,
                        token: rs.data.token.accessToken,
                        userInfo: res.data
                    }
                    dispatch(LoginSuccess({user}))
                })
                .catch(e =>{
                    dispatch(LoginFailure())
                })
            }
            else dispatch(LoginFailure())
            
        })
        .catch(e =>{
            dispatch(LoginFailure())
        })
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
            
    })
}
export const RegisterFailure = (e) => {
    return {
        payload: {
            message: e
        },
        type: userActionTypes.REGISTER_FAILURE
    }
}