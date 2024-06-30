import axiosClient from './axiosClient'

const tourAPI = {
  getAllTours: () => {
    const url = '/tours'
    return axiosClient.get(url)
  },
  createTour: (data) => {
    const url = '/tours'
    return axiosClient.post(url, data)
  },
  deleteTour: (id) => {
    const url = `/tours/${id}`
    return axiosClient.delete(url)
  }
}
export default tourAPI
