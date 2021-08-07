import * as ActionTypes from '../actionTypes'
import {
  fetchListStory,
  fetchDetailStory,
  fetchCreateStory,
  fetchHeartStory,
  fetchUnHeartStory
} from '../../api/story'
import {
  v4 as uuidv4
} from 'uuid';
import { flex } from 'styled-system';

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
        liked: data.data.liked
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

export const resetStory = () => async (dispatch, getState) => {

  dispatch({
    type: ActionTypes.RESET_STORY,
    payload: {
      title: "",
      background: {
        backgroundColor: ["#000000"],
        color: "#ffffff"
      },
      contents: [{
        text: "",
        width: 50,
        height: 50,
        x: 20,
        y: 0,
        _id: uuidv4()
      }],
      templates: [],
      image: "",
    }
  })
}

export const setStory = (story) => async (dispatch, getState) => {

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      story,
    }
  })
}

export const addTemplate = (template) => async (dispatch, getState) => {

  const data = [...getState().story.templates, {
    template: template,
    x: 0,
    y: 300,
    _id: uuidv4()
  }]

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      templates: data
    }
  })
}

export const getBackground = (background) => async (dispatch, getState) => {

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      background: {
        backgroundColor: background.backgroundColor,
        color: background.color,
        _id: background._id
      }
    }
  })
}

export const addContent = () => async (dispatch, getState) => {

  const data = [...getState().story.contents, {
    width: 50,
    height: 50,
    x: 0,
    y: 300,
    _id: uuidv4()
  }]

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      contents: data
    }
  })
}

export const updateAreaContent = (item) => async (dispatch, getState) => {
  let listContents = getState().story.contents.filter(e => e._id !== item._id)
  listContents.push(item)

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      contents: listContents
    }
  })
}

export const updateTitle = (title) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      title
    }
  })
}

export const updateImage = (image) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      image
    }
  })
}

export const changeContent = (value) => async (dispatch, getState) => {

  let listContents = JSON.parse(JSON.stringify(getState().story.contents))
  let index = getState().story.contents.findIndex(e => e._id === value._id)
  let content = JSON.parse(JSON.stringify(getState().story.contents.find(e => e._id === value._id)))

  content = {
    ...content,
    text: value.text
  }
  listContents[index] = content

  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      contents: listContents
    }
  })
}

export const createStory = () => async (dispatch, getState) => {

  const templates = getState().story.templates.map((item, index) => {
    return {
      template: item.template._id,
      x: item.x,
      y: item.y
    }
  })

  const contents = getState().story.contents.map((item, index) => {
    return {
      text: item.text,
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.height
    }
  })

  const background = (getState().story.background && getState().story.background._id) ?
    getState().story.background._id : getState().story.background

  const story = {
    ...getState().story,
    templates: templates,
    background: background,
    contents: contents
  }

  dispatch({
    type: ActionTypes.STORY_START,
    payload: {
      loading: true,
    }
  })
  try {

    await fetchCreateStory(story)

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

export const changePositionTemplate = (value) => async (dispatch, getState) => {

  let listTemplates = JSON.parse(JSON.stringify(getState().story.templates))
  let index = getState().story.templates.findIndex(e => e._id === value._id)
  let template = JSON.parse(JSON.stringify(getState().story.templates.find(e => e._id === value._id)))
  template = {
    ...template,
    x: template.x + value.x,
    y: template.y + value.y
  }
  listTemplates[index] = template
  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      templates: listTemplates
    }
  })
}

export const changePositionContent = (value) => async (dispatch, getState) => {

  let listContents = JSON.parse(JSON.stringify(getState().story.contents))
  let index = getState().story.contents.findIndex(e => e._id === value._id)
  let content = JSON.parse(JSON.stringify(getState().story.contents.find(e => e._id === value._id)))

  content = {
    ...content,
    x: content.x + value.x,
    y: content.y + value.y
  }
  listContents[index] = content
  dispatch({
    type: ActionTypes.SET_STORY,
    payload: {
      contents: listContents
    }
  })
}

export const heartStory = (id, status) => async (dispatch, getState) => {
  try {
    if(status){
      await fetchHeartStory(id)
      const hearts = JSON.parse(JSON.stringify(getState().story.hearts))
      hearts.push(id)
      dispatch({
        type: ActionTypes.SET_STORY,
        payload: {
          hearts: hearts,
          liked: true
        }
      })

    }
    else{
      await fetchUnHeartStory(id)
      const hearts = getState().story.hearts.filter(e => e !== id)
      dispatch({
        type: ActionTypes.SET_STORY,
        payload: {
          hearts: hearts,
          liked: false
        }
      })
    }
  }
  catch(err){
    console.log(err)
  }


}