import { Department } from '../../models/Department'
import axiosClient from './axiosClient'

const DepartmentApi = {
  getAll(): Promise<Department[]> {
    const url = '/Department'
    return axiosClient.get(url)
  }
}

export default DepartmentApi
