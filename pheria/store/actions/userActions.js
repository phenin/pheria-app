import * as ActionTypes from '../actionTypes'
import { AsyncStorage } from 'react-native';
import {
  fetchLoginByGG,
  fetchLogin,
  fetchSignUp,
  fetchUser
} from '../../api/user'

_storeData = async (key,value) => {
  console.log(key,value)
  try {
    await AsyncStorage.setItem(
      key,value
    );
  } catch (error) {
    // Error saving data
  }
};

export const loginByGG = (params) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.USER_START,
    payload: {
      loading: true,
    }
  })

  try {
    const data = await fetchLoginByGG(params)

    _storeData('accessToken', data.data.token.accessToken)
    _storeData('refreshToken', data.data.token.refreshToken)

    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: {
        token: data,
        loading: false,
      }
    })
    
  } catch (error) {
      dispatch({
          type: ActionTypes.USER_ERROR,
          payload: {
            error: error,
            dataLoading: false,
          }
      })
  }

}

export const login = (params) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.USER_START,
    payload: {
      loading: true,
    }
  })

  try {
    const data = await fetchLogin(params)

    _storeData('accessToken', data.data.token.accessToken)
    _storeData('refreshToken', data.data.token.refreshToken)

    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: {
        token: data,
        loading: false,
      }
    })
    
  } catch (error) {
      dispatch({
          type: ActionTypes.USER_ERROR,
          payload: {
            error: error,
            dataLoading: false,
          }
      })
  }

}

export const signUp = (params) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.USER_START,
    payload: {
      loading: true,
    }
  })

  try {
    
    const data = await fetchSignUp(params)

    _storeData('accessToken', data.data.token.accessToken)
    _storeData('refreshToken', data.data.token.refreshToken)
    dispatch({
      type: ActionTypes.SIGNUP_SUCCESS,
      payload: {
        token: data,
        loading: false,
      }
    })
  } catch (error) {
      dispatch({
          type: ActionTypes.USER_ERROR,
          payload: {
            error: error,
            dataLoading: false,
          }
      })
  }

}

export const getUser = (params) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.USER_START,
    payload: {
      loading: true,
    }
  })

  try {
    
    const data = await fetchUser(params)
    dispatch({
      type: ActionTypes.GET_USER_SUCCESS,
      payload: {
        user: data.data,
        loading: false,
      }
    })
  } catch (error) {
      dispatch({
          type: ActionTypes.USER_ERROR,
          payload: {
            error: error,
            dataLoading: false,
          }
      })
  }

}