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
export const listComment = (params) => get(`${endpoints.comment}/${params._id}`)
export const comment = (params) => post(`${endpoints.comment}`, params)
export const replyComment = (params) => put(`${endpoints.comment}/${params.replyId}/reply`, params)

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

export const fetchListComment = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(listComment, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchComment = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(comment, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchReplyComment = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(replyComment, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}