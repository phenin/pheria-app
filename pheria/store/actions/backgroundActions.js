import * as ActionTypes from '../actionTypes'
import {
  fetchListBackground,
} from '../../api/background'
import {
  REACT_APP_API
} from "../../constants"

export const getListBackground = (params) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.BACKGROUND_START,
    payload: {
      loading: true,
    }
  })

  try {
    const data = await fetchListBackground()

    dispatch({
      type: ActionTypes.GET_LIST_BACKGROUND_SUCCESS,
      payload: {
        listBackground: data.data.background,
        loading: false,
      }
    })
    return true

  } catch (error) {
    dispatch({
      type: ActionTypes.BACKGROUND_ERROR,
      payload: {
        error: error,
        loading: false,
      }
    })
    return false
  }

}

export const setBackground = (background) => async (dispatch, getState) => {

  const images = background && background.image.map(image => {
    return {
      ...image,
      url: image.url ? `${REACT_APP_API}/${image.url}` : image
    }
  })
  const backgroundClone = {
    ...background,
    image: images
  }
  dispatch({
    type: ActionTypes.SET_BACKGROUND,
    payload: {
      background: backgroundClone
    }
  })
}