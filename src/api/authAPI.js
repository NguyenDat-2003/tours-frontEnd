import axiosClient from './axiosClient'

const authAPI = {
  logIn: (data) => {
    const url = '/users/login'
    return axiosClient.post(url, data)
  },
  signUp: () => {
    const url = '/users/login'
    return axiosClient.post(url)
  }
}
export default authAPI
