import { useEffect, useState } from 'react'
import { Product } from '../../../models/Product'
import ProductApi from '../../../api/Hieu/ProductApi'

export default function useProductList() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    ApiHandler()
  }, [])

  const ApiHandler = async () => {
    try {
      setLoading(true)
      await ProductApi.getAll().then(res => {
        console.log(res.products)
        setProducts(res.products)
      })
      setLoading(false)
    } catch (error) {
      setError(`${error}`)
    }
  }

  return {
    products,
    loading,
    error
  }
}
