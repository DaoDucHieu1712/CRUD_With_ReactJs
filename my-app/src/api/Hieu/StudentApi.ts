import { Student } from '../../models/Student'
import axiosClient from './axiosClient'
import axiosPrivate from './axiosPrivate'
const StudentApi = {
  getAll(): Promise<Student[]> {
    const url = '/Student'
    return axiosPrivate.get(url)
  },
  getStudent(id: string | undefined): Promise<Student> {
    const url = `/Student/${id}`
    return axiosClient.get(url)
  },
  create(data: any): Promise<string> {
    const url = '/Student'
    return axiosClient.post(url, data)
  },
  update(id: string | undefined, data: any): Promise<string> {
    const url = `/Student/${id}`
    data.id = id
    return axiosClient.put(url, data)
  },
  delete(id: string | undefined): Promise<string> {
    const url = `/Student/${id}`
    return axiosClient.delete(url)
  }
}

export default StudentApi
