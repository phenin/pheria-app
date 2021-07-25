import * as ActionTypes from '../actionTypes'
import {
  fetchListTemplate,
} from '../../api/template'
import {REACT_APP_API} from "../../constants"

export const getListTemplate = (params) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.TEMPLATE_START,
    payload: {
      loading: true,
    }
  })

  try {
    const data = await fetchListTemplate(params)

    dispatch({
      type: ActionTypes.GET_LIST_TEMPLATE_SUCCESS,
      payload: {
        listTemplate: data.data,
        loading: false,
      }
    })
    return true
    
  } catch (error) {
    dispatch({
        type: ActionTypes.TEMPLATE_ERROR,
        payload: {
          error: error,
          loading: false,
        }
    })
    return false
  }

}

export const setTemplate = (template) => async (dispatch, getState) => {
  
  const images =template && template.image.map(image => {
    return {
      ...image,
      url: image.url ? `${REACT_APP_API}/${image.url}` : image
    }
  })
  const templateClone = {
    ...template,
    image: images
  }
  dispatch({
    type: ActionTypes.SET_TEMPLATE,
    payload: {
      template: templateClone
    }
  })
}
