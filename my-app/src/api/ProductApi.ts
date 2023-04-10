import { ListResponse, Product } from '../models/Product'
import axiosClient from './axiosClient'

const ProductApi = {
  getAll(): Promise<ListResponse<Product>> {
    const url = '/products'
    return axiosClient.get(url)
  },
  getProduct(id: number): Promise<Product> {
    const url = `/products/${id}`
    return axiosClient.get(url)
  },
  getAllCategory(): Promise<string[]> {
    const url = `/products/categories`
    return axiosClient.get(url)
  },
  getProductByCategory(category: string): Promise<ListResponse<Product>> {
    const url = `/products/category/${category}`
    return axiosClient.get(url)
  },
  searchProduct(search: string): Promise<ListResponse<Product>> {
    const url = `/products/search?q=${search}`
    return axiosClient.get(url)
  },
  addProduct(params: Product): Promise<Product> {
    const url = '/products/add'
    return axiosClient.post(url, params)
  },
  updateProduct(params: Product): Promise<Product> {
    const url = `/products/${params.id}`
    return axiosClient.put(url, params)
  },
  deleteProduct(id: number): Promise<Product> {
    const url = `/products/${id}`
    return axiosClient.delete(url)
  }
}

export default ProductApi
