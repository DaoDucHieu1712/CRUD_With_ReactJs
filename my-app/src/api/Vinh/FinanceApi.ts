import { Finance, Response } from '../../models/Finance'
import axiosClient from './axiosClient'

const FinanceApi = {
  getAll(): Promise<Finance[]> {
    const url = '/Finance'
    return axiosClient.get(url)
  },
}

export default FinanceApi
