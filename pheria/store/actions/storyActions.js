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
        ...data.data.story,
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
    // if(params.uuid){
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

  let listContents = JSON.parse(JSON.stringify(getState().story.contents))
  let index = getState().story.contents.findIndex(e=>e.uuid === value.uuid)
  let content = JSON.parse(JSON.stringify(getState().story.contents.find(e=>e.uuid === value.uuid)))

  content = {...content, text: value.text}
  listContents[index] = content

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

export const changePositionTemplate = (value) => async (dispatch, getState) =>{

  let listTemplates = getState().story.templates.filter(e=>e.uuid !== value.uuid)
  let template = JSON.parse(JSON.stringify(getState().story.templates.find(e=>e.uuid === value.uuid)))
  template = {...template, x: value.x, y: value.y}
  listTemplates.push(template)

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      templates: listTemplates
    }
  })
}

export const changePositionContent = (value) => async (dispatch, getState) =>{

  let listContents = JSON.parse(JSON.stringify(getState().story.contents))
  let index = getState().story.contents.findIndex(e=>e.uuid === value.uuid)
  let content = JSON.parse(JSON.stringify(getState().story.contents.find(e=>e.uuid === value.uuid)))

  content = {...content, x: value.x, y: value.y}
  listContents[index] = content
  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      contents: listContents
    }
  })
}