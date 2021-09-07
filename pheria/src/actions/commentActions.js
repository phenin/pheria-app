import { commentActionTypes } from '../reducers/commentReducer';
import {
  fetchListComment,
  postComment,
  postReplyComment,
  likingComment,
  unlikingComment,
  likingReplyComment,
  unlikingReplyComment,
  showRepliesComment
} from '../api/story'

export const FetchCommentListRequest = (storyId) => {
    return async (dispatch, getState) => {
      let story = getState().storyList.find(e=>e._id === storyId)

      const query = {
        limit: 10,
        offset: 0
      }

      let res
      try {
        res = await fetchListComment(storyId, query)
      }
      catch(e){
        dispatch(FetchCommentListFailure())
      }
      if(res.data){
        const payload = {
          comments: res.data.comments,
          total: res.data.total,
          story: story,
          scrollDown: false
        }
        dispatch(FetchCommentListSuccess(payload))
      }
      else {
        dispatch(FetchCommentListFailure())
      }
      
    }
}
export const FetchCommentListFailure = () => {
    return {
        type: commentActionTypes.FETCH_COMMENTS_FAILURE,
        payload: {
            message: 'Get Comments Failed!'
        }
    }
}
export const FetchCommentListSuccess = (payload) => {
    return {
        type: commentActionTypes.FETCH_COMMENTS_SUCCESS,
        payload: payload
    }
}

/**
 * Story COMMENTS ACTIONS
 */
 export const StoryCommentRequest = (storyId, content) => {
  const params = {
      story: storyId,
      content
  }
  return async (dispatch, getState) => {
      let res
      try {
        res = await postComment(params)
      }
      catch(e){
        dispatch(StoryCommentFailure())
      }
      let comments = getState().comment.comments
      if(res.data) {
        const payload = {
          comments: [...comments, res.data],
          scrollDown: false
        }
        dispatch(StoryCommentSuccess(payload))
      }
      else {
        dispatch(StoryCommentFailure())
      }
  }
}
export const StoryCommentFailure = () => {
  return {
      type: commentActionTypes.COMMENT_STORY_FAILURE,
      payload: {
          message: 'Bạn không thể bình luận'
      }
  }
}
export const StoryCommentSuccess = (payload) => {
  return {
      type: commentActionTypes.COMMENT_STORY_SUCCESS,
      payload: payload
  }
}

/**
 * POST REPLY ACTIONS
 */
 export const StoryReplyRequest = (commentId, content) => {
  const params = {
    commentId,
    content
  }
  
  return async (dispatch, getState) => {
    let res
    try{
      res = await postReplyComment(params)
    }
    catch(e){
      dispatch(StoryReplyFailure())
    }
    
    let comments = getState().comment.comments
    if(res.data) {
      comments = comments.map(comment => {
        if (comment._id === commentId) {
            comment = { ...comment }
            comment.replies = res.data.replies
        }
        return comment
      })
      dispatch(StoryReplySuccess({
        comments,
        scrollDown: false
      }))
    }
    else{
      dispatch(StoryReplyFailure())
    }

  }
}
export const StoryReplyFailure = () => {
  return {
      type: commentActionTypes.REPLY_COMMENT_FAILURE,
      payload: {
          message: 'Can not load more posts!'
      }
  }
}
export const StoryReplySuccess = (payload)=> {
  return {
      type: commentActionTypes.REPLY_COMMENT_SUCCESS,
      payload: payload
  }
}

/**
 * LOAD MORE COMMENTS ACTIONS
 */
export const LoadMoreCommentListRequest = (storyId) => {
  return async (dispatch, getState) => {
    let story = getState().storyList.find(e=>e._id === storyId)
    let total = getState().comment.total
    let length = getState().comment.comments.length

    if(total <= length) {
      return
    }

    const query = {
      limit: 10,
      offset: length
    }

    let res
    try {
      res = await fetchListComment(storyId, query)
    }
    catch(e){
      dispatch(LoadMoreCommentListFailure())
    }
    if(res.data){
      const payload = {
        comments: res.data.comments,
        story: story,
        scrollDown: false
      }
      dispatch(LoadMoreCommentListSuccess(payload))
    }
    else {
      dispatch(LoadMoreCommentListFailure())
    }
    
  }
}
export const ResetCommentList = () => {
    return {
        type: commentActionTypes.FETCH_COMMENTS_REQUEST,
    }
}
export const LoadMoreCommentListFailure = () => {
    return {
        type: commentActionTypes.LOAD_MORE_COMMENTS_FAILURE,
        payload: {
            message: 'Không thể lấy thêm bình luận'
        }
    }
}
export const LoadMoreCommentListSuccess = (payload) => {
    return {
        type: commentActionTypes.LOAD_MORE_COMMENTS_SUCCESS,
        payload: payload
    }
}
/**
 * TOGGLE LIKE REPLY ACTION
 */
export const ToggleLikeCommentRequest = (commentId, isLiked) => {
    const params = {
      _id: commentId
    }
    return async (dispatch, getState) => {
      let res
      if(!isLiked) {
        
        try {
          res = await likingComment(params)
        }
        catch(e) {
          dispatch(ToggleLikeCommentFailure())
        }

        let comments = getState().comment.comments
        let me = getState().user.user?.userInfo?._id

        if(res.data) {
          let listcomments = comments.map(comment => {
            if (comment._id === commentId) {
                const newComment = { ...comment }
                newComment.likes = [...comment.likes, me]
                return newComment
            }
            return comment
          })

          const payload = {
            comments: listcomments,
            scrollDown: true
          }
          dispatch(ToggleLikeCommentSuccess(payload))
        }
        else{
          dispatch(ToggleLikeCommentFailure())
        }
                  
      }
      else{

        try {
          res = await unlikingComment(params)
        }
        catch(e) {
          dispatch(ToggleLikeCommentFailure())
        }

        let comments = getState().comment.comments
        let me = getState().user.user?.userInfo?._id

        if(res.data) {
          comments = comments.map(comment => {
            if (comment._id === commentId) {
                const newComment = { ...comment }
                newComment.likes = comment.likes.filter(e => e !== me)
                return newComment
            }
            return comment
          })

          const payload = {
            comments: comments,
            scrollDown: true
          }
          dispatch(ToggleLikeCommentSuccess(payload))
        }
        else{
          dispatch(ToggleLikeCommentFailure())
        }
        
      }
      
    }
}
export const ToggleLikeCommentFailure = () => {
    return {
        type: commentActionTypes.TOGGLE_LIKE_COMMENT_FAILURE,
        payload: {
            message: 'Đã xảy ra lỗi, vui lòng thử lại sau'
        }
    }
}
export const ToggleLikeCommentSuccess = (payload) => {
    return {
        type: commentActionTypes.TOGGLE_LIKE_COMMENT_SUCCESS,
        payload: payload
    }
}
// /**
//  * TOGGLE LIKE COMMMENT ACTION
//  */

export const ToggleShowRepliesCommentRequest = (commentId) => {
  
  return async (dispatch, getState) => {
    let comments = getState().comment.comments
    let currentComment = comments.find(e=>e._id === commentId)
    const total = currentComment.repliesCount
    const length = currentComment.replies?.length || 0
    if(total <= length) {
      dispatch(ToggleShowRepliesCommentFailure())
      return
    }
    const query = {
      limit: 4,
      offset: length
    }

    let res

    try {
      res = await showRepliesComment(commentId, query)
    }
    catch(e) {
      dispatch(ToggleShowRepliesCommentFailure())
      return
    }

    if(res?.data){
      comments = comments.map(comment => {
        if (comment._id === commentId) {
            const newComment = { ...comment }
            newComment.replies = [...comment?.replies || [],...res.data?.replies]
            return newComment
        }
        return comment
      })
      const payload = {
        comments: comments,
        scrollDown: true
      }
      dispatch(ToggleShowRepliesCommentSuccess(payload))
    }
    else{
      dispatch(ToggleShowRepliesCommentFailure())
    }
  }
}

export const ToggleShowRepliesCommentFailure = () => {
  return {
      type: commentActionTypes.TOGGLE_SHOW_REPLIES_COMMENT_FAILURE,
      payload: {
          message: 'Đã xảy ra lỗi, vui lòng thử lại sau lllllll'
      }
  }
}

export const ToggleShowRepliesCommentSuccess = (payload) => {
  return {
      type: commentActionTypes.TOGGLE_SHOW_REPLIES_COMMENT_SUCCESS,
      payload: payload
  }
}

// /**
//  * TOGGLE LIKE COMMMENT ACTION
//  */
export const ToggleLikeReplyRequest = (replyId, commentId, isLiked)=> {
  const params = {
    _id: commentId,
    replyId
  }
  return async (dispatch, getState) => {
    let res
    if(!isLiked) {
      try {
        res = await likingReplyComment(params)
      }
      catch(e) {
        dispatch(ToggleLikeReplyFailure())
      }

      let comments = getState().comment.comments
      let me = getState().user.user?.userInfo?._id

      if(res.data) {
        let listcomments = comments.map(xComment => {
          if (xComment._id === commentId) {
              const newComment = { ...xComment }
              newComment.replies = xComment.replies?.map(xReply => {
                  xReply = { ...xReply }
                  if (xReply._id === replyId) {
                      xReply.likes =  [...xReply.likes, me]
                  }
                  return xReply
              }) || []
              return newComment
          }
          return xComment
        })

        const payload = {
          comments: listcomments,
          scrollDown: true
        }
        dispatch(ToggleLikeReplySuccess(payload))
      }
      else{
        dispatch(ToggleLikeReplyFailure())
      }
    }
    else {
      try {
        res = await unlikingReplyComment(params)
      }
      catch(e) {
        dispatch(ToggleLikeReplyFailure())
      }

      let comments = getState().comment.comments
      let me = getState().user.user?.userInfo?._id

      if(res.data) {
        let listcomments = comments.map(xComment => {
          if (xComment._id === commentId) {
              const newComment = { ...xComment }
              newComment.replies = xComment.replies?.map(xReply => {
                  xReply = { ...xReply }
                  if (xReply._id === replyId) {
                      xReply.likes = xReply.likes.filter(e => e !== me)
                  }
                  return xReply
              }) || []
              return newComment
          }
          return xComment
        })

        const payload = {
          comments: listcomments,
          scrollDown: true
        }
        dispatch(ToggleLikeReplySuccess(payload))
      }
      else{
        dispatch(ToggleLikeReplyFailure())
      }
    }
  }
}
export const ToggleLikeReplyFailure = () => {
    return {
        type: commentActionTypes.TOGGLE_LIKE_COMMENT_FAILURE,
        payload: {
            message: 'Get Comments Failed!'
        }
    }
}
export const ToggleLikeReplySuccess = (payload) => {
    return {
        type: commentActionTypes.TOGGLE_LIKE_COMMENT_SUCCESS,
        payload: payload
    }
}

