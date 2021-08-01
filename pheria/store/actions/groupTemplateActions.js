import * as ActionTypes from '../actionTypes'
import {
  fetchListGroupTemplate,
} from '../../api/groupTemplate'
import {REACT_APP_API} from "../../constants"

export const getListGroupTemplate = (params) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.GROUPTEMPLATE_START,
    payload: {
      loading: true,
    }
  })

  try {
    const data = await fetchListGroupTemplate(params)

    dispatch({
      type: ActionTypes.GET_LIST_GROUPTEMPLATE_SUCCESS,
      payload: {
        listGroupTemplate: data.data.groupTemplate,
        loading: false,
      }
    })
    return true
    
  } catch (error) {
    dispatch({
        type: ActionTypes.GROUPTEMPLATE_ERROR,
        payload: {
          error: error,
          loading: false,
        }
    })
    return false
  }

}

export const setGroupTemplate = (groupTemplate) => async (dispatch, getState) => {
  
  dispatch({
    type: ActionTypes.SET_GROUPTEMPLATE,
    payload: {
      groupTemplate: groupTemplate
    }
  })
}
