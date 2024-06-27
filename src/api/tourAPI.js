import axiosClient from './axiosClient'

const tourAPI = {
  getAllTours: () => {
    const url = '/tours'
    return axiosClient.get(url)
  }
}
export default tourAPI
