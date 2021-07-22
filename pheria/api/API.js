import axios from "axios";
import { AsyncStorage } from 'react-native';

_retrieveData = async (key) => {
  
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }
  } catch (error) {
    // Error retrieving data
    return null
  }
};

_storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(
      key,value
    );
  } catch (error) {
    // Error saving data
  }
};

const defaultConfig = {
  token_required: true,
  stringify_data: false,
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  timeout: 7000,
});

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await _retrieveData("accessToken");
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = _retrieveData("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      return axios
        .post(`${process.env.REACT_APP_API}/api/user/refresh`, { refreshToken: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            _storeData("accessToken", res.data.accessToken);
            _storeData("refreshToken", res.data.refreshToken);

            originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`
 
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

/*
 * Wraps axios and provides
 * more convenient POST method
 * calls with data
 */
export function post(uri, data = {}, config = {}) {
  config = {
    ...defaultConfig,
    ...config,
  };

  return axiosInstance.post(uri, data, config)
}

/*
 * Wraps axios and provides
 * more convenient GET method
 * calls with data.
 */
export function get(uri, params = {}, config = {}) {
  config = {
    params,
    ...defaultConfig,
    ...config,
  }

  return axiosInstance.get(uri, config)
}

/*
 * Wraps axios and provides
 * more convenient PUT method
 * calls with data.
 */

export function put(uri, data = {}, config = {}) {
  config = {
    ...defaultConfig,
    ...config,
  };

  return axiosInstance.put(uri, data, config)
}

/*
 * Wraps axios and provides
 * more convenient DELETE method
 * calls with data.
 */

export function remove(uri, params = {}, config = {}) {
  config = {
    ...defaultConfig,
    ...config,
    params
  };

  return axiosInstance.delete(uri, config)
}

export function customFetch(func, params) {
    return new Promise((resolve, reject) => {
        func(params)
            .then(data => {
                if (data) {
                    return resolve(data)
                }
                else {
                    reject('LoadingdataError')
                }
            })
            .catch(async (error) => {
                if (error) {
                    const errorMessage = error.json && await error.json()

                    if (
                      !error.ok
                      && (
                        error.status === 401
                        || (error.status === 404 && errorMessage && errorMessage.title === 'Token not found')
                      )
                    ) {
                        return reject('TokenExpire')
                    }
                    else return reject('LoadingdataError')
                }
                else return reject('LoadingdataError')
            })
    })
}
