import { User, Response } from '../../models/User'
import axiosClient from './axiosClient'

const UserApi = {
    getAll(): Promise<User[]> {
      const url = '/users'
      return axiosClient.get(url)
    },
    add(user: User): Promise<User> {
      const url = '/users';
      return axiosClient.post(url, user);
    },
    delete(id: number): Promise<Response> {
      const url = `/users/${id}`;
      return axiosClient.delete(url);
    },
    update(id: number, user: User): Promise<User> {
      const url = `/users/${id}`;
      return axiosClient.put(url, user);
    }
  }
  
  

export default UserApi;