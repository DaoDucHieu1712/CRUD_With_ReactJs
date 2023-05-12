import { Candy, Response } from '../../models/Candy'
import axiosClient from './axiosClient'

const CandyApi = {
  getAll(): Promise<Candy[]> {
    const url = '/candys'
    return axiosClient.get(url)
  },
  createCandy(params: Candy): Promise<Candy> {
    const url = '/candys'
    return axiosClient.post(url, params)
  },
  deleteCandy(id: number): Promise<any> {
    const url = `/candys/${id}`
    return axiosClient.delete(url)
  },
  getCandy(id: number): Promise<any> {
    const url = `/candys/${id}`
    return axiosClient.get(url)
  },
  update(id: number, candy: Candy): Promise<Candy> {
    const url = `/candys/${id}`;
    return axiosClient.put(url, candy);
  }
}

export default CandyApi
