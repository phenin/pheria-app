import {
  get,
  customFetch
} from './API'

const endpoints = {
  get: '/api/group-template',
}

export const getList = (params) => get(endpoints.get)

export const fetchListGroupTemplate = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(getList, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}