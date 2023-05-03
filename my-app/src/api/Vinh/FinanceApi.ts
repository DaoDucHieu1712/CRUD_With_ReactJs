import { Finance, Response } from '../../models/Finance'
import axiosClient from './axiosClient'

const FinanceApi = {
  getAll(): Promise<Finance[]> {
    const url = '/Finance'
    return axiosClient.get(url)
  },
  createFinance(params : Finance): Promise<Finance> {
    const url = '/Finance'
    return axiosClient.post(url, params)
  },
  deleteFinance(id: number): Promise<any>{
    const url = `/Finance/${id}`
    return axiosClient.delete(url)
  },
  getFinance(id: number): Promise<any>{
    const url = `/Finance/${id}`
    return axiosClient.get(url)
  }
}

export default FinanceApi
