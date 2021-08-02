import * as ActionTypes from '../actionTypes'
import {
  fetchListStory,
  fetchDetailStory,
  fetchCreateStory,
  fetchUpdateStory
} from '../../api/story'
import { v4 as uuidv4 } from 'uuid';

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

export const addTemplate = (template) => async (dispatch, getState) =>{

  const data = [...getState().story.templates, {
    template: template._id,
    templateData: template,
    x: 0,
    y: 300,
    uuid: uuidv4()
  }]

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      templates: data
    }
  })
}

export const getBackground = (background) => async (dispatch, getState) =>{
  
  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      backgroundData: {
        backgroundColor: background.backgroundColor,
        color: background.color,
      },
      background: background._id
    }
  })
}

export const addContent = () => async (dispatch, getState) =>{

  const data = [...getState().story.contents, {
    width: 50,
    height: 50,
    x: 0,
    y: 300,
    uuid: uuidv4()
  }]

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      contents: data
    }
  })
}

export const updateAreaContent = (item) => async (dispatch, getState) =>{
  let listContents = getState().story.contents.filter(e=>e.uuid !== item.uuid)
  listContents.push(item)

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      contents: listContents
    }
  })
}

export const updateTitle = (title) => async (dispatch, getState) =>{
  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      title
    }
  })
}

export const updateImage = (image) => async (dispatch, getState) =>{
  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      image
    }
  })
}

export const changeContent = (value) => async (dispatch, getState) =>{
  console.log(value)

  let listContents = getState().story.contents.filter(e=>e.uuid !== value.uuid)
  let content = JSON.parse(JSON.stringify(getState().story.contents.find(e=>e.uuid === value.uuid)))
  content = {...content, text: value.text}
  listContents.push(content)

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      contents: listContents
    }
  })
}

export const saveStory = (image) => async (dispatch, getState) =>{
  console.log(getState().story)
  dispatch({
    type: ActionTypes.STORY_START,
    payload: {
      loading: true,
    }
  })
  try {
   
    await fetchCreateStory(getState().story)    

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