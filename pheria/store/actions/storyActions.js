import * as ActionTypes from '../actionTypes'
import {
  fetchListStory,
  fetchDetailStory,
  fetchCreateStory,
  fetchUpdateStory
} from 'api/story'

export const getListStory = (params) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.STORY_START,
    payload: {
      loading: true,
    }
  })

  try {
    const data = await fetchListStory(params)

    dispatch({
      type: ActionTypes.GET_LIST_STORY_SUCCESS,
      payload: {
        listStory: data.data.story,
        total: data.data.total,
        loading: false,
      }
    })
    return true
    
  } catch (error) {
    dispatch({
        type: ActionTypes.STORY_ERROR,
        payload: {
          error: error,
          loading: false,
        }
    })
    return false
  }

}

export const getDetailStory = (params) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.STORY_START,
    payload: {
      loading: true,
    }
  })

  try {
    const data = await fetchDetailStory(params)

    dispatch({
      type: ActionTypes.GET_DETAIL_STORY_SUCCESS,
      payload: {
        story: data.data.story,
        loading: false,
      }
    })
    return true
    
  } catch (error) {
    dispatch({
        type: ActionTypes.STORY_ERROR,
        payload: {
          error: error,
          loading: false,
        }
    })
    return false
  }

}

export const createUpdateStory = (params) => async (dispatch, getState) => {
  
  dispatch({
    type: ActionTypes.STORY_START,
    payload: {
      loading: true,
    }
  })

  try {
    // if(params._id){
    //   await fetchUpdateStory(params)
    // }
    // else{
      await fetchCreateStory(params)
    // }
    

    dispatch({
      type: ActionTypes.CREATE_STORY_SUCCESS,
      payload: {
        loading: false,
      }
    })
    return true
    
  } catch (error) {
    dispatch({
        type: ActionTypes.STORY_ERROR,
        payload: {
          error: error,
          loading: false,
        }
    })
    return false
  }

}

export const setStory = (story) => async (dispatch, getState) => {
  
  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      story: story
    }
  })
}
