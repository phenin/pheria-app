import { userActionTypes } from '../reducers/userReducer';
import {
    fetchLoginByGG,
    fetchLogin,
    fetchSignUp,
    fetchUser,
    fetchUserListStory,
    fetchMyListStory,
    updateUserInfoRequest
}  from '../api/user'
import { getToken, setToken } from "../utils/util"
import axios from 'axios';


export const LoginRequest = (params) => {
    return (dispatch) => {
        fetchLogin(params).then(rs => {
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

export const UploadAvatarRequest = (uri, extension) => {
    return async (dispatch) => {
        const data = new FormData();
        data.append('image', {
            name: extension,
            uri:
            Platform.OS === 'android'
                ? uri
                : uri.replace('file://', ''),
        });
        // Change file upload URL
        const config = {
            method: 'post',
            url: 'https://api.imgur.com/3/image',
            headers: {
            Authorization: 'Client-ID 574f96546392ad0',
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
            },
            data: data,
        };

        axios(config)
            .then(response => {
                dispatch(UpdateUserInfoRequest({
                    picture: response.data.data.link
                }))

            })
            .catch(error => {
                console.log('lỗi upload ảnh', error);
            });
       
    }
}

export const UpdateUserInfoRequest = (updateUserData) => {
    return async (dispatch, getState) => {
        const me = getState().user.user?.userInfo
        const data = {
            _id: me._id,
            name: me.name,
            picture: me.picture,
            description: me.description,
            locale: me.locale,
            ...updateUserData,
        }
        updateUserInfoRequest(data).then(res => {
            if(res.data){
                
                dispatch(UpdateUserInfoSuccess(res.data))
            }
            else {
                dispatch(UpdateUserInfoFailure())
            }
        })
        .catch(error => {
            console.log('error ccc', error);
        });
       
    }
}
export const UpdateUserInfoFailure = () => {
    return {
        type: userActionTypes.UPDATE_USER_INFO_FAILURE,
        payload: {
            message: `Can't update now, try again!`
        }
    }
}
export const UpdateUserInfoSuccess = (user) => {
    return {
        type: userActionTypes.UPDATE_USER_INFO_SUCCESS,
        payload: user
    }
}