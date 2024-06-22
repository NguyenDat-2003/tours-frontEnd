import axiosClient from './axiosClient'

const authAPI = {
  logIn: (data) => {
    const url = '/users/login'
    return axiosClient.post(url, data)
  },
  logOut: () => {
    const url = '/users/logout'
    return axiosClient.post(url)
  },
  signUp: (data) => {
    const url = '/users/signup'
    return axiosClient.post(url, data)
  }
}
export default authAPI
