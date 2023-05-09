import { Cat, Response } from '../../models/Cat'
import axiosClient from './axiosClient'

const CatApi = {
    getAll(): Promise<Cat[]> {
      const url = '/cats'
      return axiosClient.get(url)
    },
    add(cat: Cat): Promise<Cat> {
      const url = '/cats';
      return axiosClient.post(url, cat);
    },
    delete(id: number): Promise<Response> {
      const url = `/cats/${id}`;
      return axiosClient.delete(url);
    },
    update(id: number, cat: Cat): Promise<Cat> {
      const url = `/cats/${id}`;
      return axiosClient.put(url, cat);
    }
  }
  
  

export default CatApi;