import {
  get,
  post,
  put,
  customFetch
} from './API'

const endpoints = {
  get: '/api/story',
}

export const getList = () => get(endpoints.get)
export const getDetail = (params) => get(`${endpoints.get}/${params._id}`)
export const create = (params) => post(endpoints.get, params)
export const update = (params) => put(`${endpoints.get}/${params._id}`, params)

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