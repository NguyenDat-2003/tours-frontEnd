import axiosClient from './axiosClient'

const userAPI = {
  updateMe: (data) => {
    const url = '/users/updateMe'
    return axiosClient.put(url, data)
  }
}
export default userAPI
