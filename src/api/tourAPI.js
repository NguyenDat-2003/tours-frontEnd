import axiosClient from './axiosClient'

const tourAPI = {
  getAllTours: () => {
    const url = '/tours'
    return axiosClient.get(url)
  },
  createTour: (data) => {
    const url = '/tours'
    return axiosClient.post(url, data)
  }
}
export default tourAPI
