import * as ActionTypes from '../actionTypes'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    title: "",
    background: "6106a1c7f72cd32419aea001",
    backgroundData: {
      backgroundColor: ["#000000"],
      color: "#ffffff"
    },
    contents: [{
      text: "",
      width: 50,
      height: 50,
      x: 10,
      y: 0,
      uuid: uuidv4()
    }],
    templates: [],
    image: ""
}

function reducer(state = initialState, action) {
    switch (action.type) {
      case ActionTypes.GET_DETAIL_STORY_SUCCESS:
      case ActionTypes.SET_STORY:
      case ActionTypes.CREATE_STORY_SUCCESS:
      case ActionTypes.UPDATE_STORY_SUCCESS:
      case ActionTypes.DELETE_STORY_SUCCESS:
        return {...state, ...action.payload};
      case ActionTypes.ADD_TEMPLATE:
        return {...state, ...action.payload};
      default:
          return state;
    }
}

export default reducer
