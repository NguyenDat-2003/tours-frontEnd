import axios from 'axios'
import queryString from 'query-string'

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/v1',
  headers: {
    'content-type': 'application/json'
  },
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    // Handle errors
    throw error
  }
)

export default axiosClient
