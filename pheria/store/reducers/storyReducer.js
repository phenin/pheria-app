import * as ActionTypes from '../actionTypes'
import {
  v4 as uuidv4
} from 'uuid';

const initialState = {
  _id: null,
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
  views: [],
  hearts: [],
  comments: [],
  liked: false,
  loading: false,
  error: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.STORY_START:
    case ActionTypes.GET_DETAIL_STORY_SUCCESS:
    case ActionTypes.CREATE_STORY_SUCCESS:
    case ActionTypes.UPDATE_STORY_SUCCESS:
    case ActionTypes.DELETE_STORY_SUCCESS:
    case ActionTypes.ADD_TEMPLATE:
    case ActionTypes.SET_STORY:
      return {
        ...state, ...action.payload
      }
      case ActionTypes.RESET_STORY:
        return {
          ...action.payload, loading: false, error: null
        }
        default:
          return state;
  }
}

export default reducer