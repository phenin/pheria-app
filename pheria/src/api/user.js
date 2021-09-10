import {
  get,
  post,
  put,
  customFetch
} from './API'

const endpoints = {
  login: '/api/user/login',
  loginbygg: '/api/user/login-by-google',
  sign_up: '/api/user/sign-up',
  get_user: '/api/user/profile',
  update_user: '/api/user/update-user/',
  get_users_list_story: '/api/story/get-users-list-story/',
  get_my_list_story: '/api/story/get-my-list-story/mylist',
  validateName: '/api/user/validateName'
}

export const login = (params) => post(endpoints.login, params, {
  token_required: false
})
export const loginbygg = (params) => post(endpoints.loginbygg, params, {
  token_required: false
})
export const signUp = (params) => post(endpoints.sign_up, params, {
  token_required: false
})
export const getUser = () => get(endpoints.get_user)
export const getUserX = (name) => post(endpoints.get_user, {name} )
export const getUserListStory = (id) => get(endpoints.get_users_list_story + id)
export const getMyListStory = () => get(endpoints.get_my_list_story )
export const updateUser = (params) => put(endpoints.update_user + params._id, params)
export const checkName = (name) => post(endpoints.validateName, {name})

export const fetchLoginByGG = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(loginbygg, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}


export const fetchLogin = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(login, params)
      .then(data => resolve(data))
      .catch(error => {console.log('error', error)
        reject(error)})
  })
}

export const fetchSignUp = (params) => {
  return new Promise((resolve, reject) => {
    customFetch(signUp, params)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    customFetch(getUser)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchUserX = (name) => {
  return new Promise((resolve, reject) => {
    customFetch(getUserX, name)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchUserListStory = (id) =>{
  return new Promise((resolve, reject) => {
    customFetch(getUserListStory, id)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const fetchMyListStory = () =>{
  return new Promise((resolve, reject) => {
    customFetch(getMyListStory)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const updateUserInfoRequest = (params) =>{
  return new Promise((resolve, reject) => {
    customFetch(updateUser, params)
      .then(data => resolve(data))
      .catch(error => { console.log(error)
        reject(error)})
  })
}

export const checkExistUsername = (name) =>{
  return new Promise((resolve, reject) => {
    customFetch(checkName, name)
      .then(data => resolve(data))
      .catch(error => { console.log(error)
        reject(error)})
  })
}
