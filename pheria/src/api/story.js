import {
  get,
  post,
  put,
  patch,
  customFetch
} from './API'

const endpoints = {
  story: '/api/story',
  comment: '/api/comment',
}

export const getList = () => get(endpoints.story)
export const getDetail = (params) => get(`${endpoints.story}/${params._id}`)
export const create = (params) => post(endpoints.story, params)
export const update = (params) => put(`${endpoints.story}/${params._id}`, params)
export const heart = (id) => patch(`${endpoints.story}/${id}/heart`)
export const unHeart = (id) => patch(`${endpoints.story}/${id}/unheart`)
export const listComment = (_id, query) => get(`${endpoints.comment}/${_id}?limit=${query.limit}&offset=${query.offset}`)
export const comment = (params) => post(`${endpoints.comment}`, params)
export const replyComment = (params) => put(`${endpoints.comment}/${params.commentId}/reply`, params)
export const likeComment = (params) => get(`${endpoints.comment}/${params._id}/like`)
export const unlikeComment = (params) => get(`${endpoints.comment}/${params._id}/unlike`)
export const likeReplyComment = (params) => get(`${endpoints.comment}/${params._id}/like/${params.replyId}`)
export const unlikeReplyComment = (params) => get(`${endpoints.comment}/${params._id}/unlike/${params.replyId}`)
export const showReplies = (_id, query) => get(`${endpoints.comment}/${_id}/replies?limit=${query.limit}&offset=${query.offset}`)

export const fetchListStory = () => {
  return new Promise((resolve, reject) => {
    customFetch(getList)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchDetailStory = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(getDetail, params)
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const fetchCreateStory = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(create, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchUpdateStory = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(update, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchHeartStory = (id) => {
  return new Promise((resolve, reject) => {
    customFetch(heart, id)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchUnHeartStory = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(unHeart, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchListComment = (params, query) => {
  return new Promise((resolve, reject) => {
    customFetch(listComment, params, query)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const postComment = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(comment, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const postReplyComment = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(replyComment, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const likingComment = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(likeComment, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const unlikingComment = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(unlikeComment, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const likingReplyComment = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(likeReplyComment, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const unlikingReplyComment = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(unlikeReplyComment, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const showRepliesComment = (params, query) => {
  return new Promise((resolve, reject) => {
    customFetch(showReplies, params, query)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}
