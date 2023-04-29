import { useEffect, useState } from 'react'
import ProductApi from '../../../api/Hieu/ProductApi'

export default function useCategoryList() {
  const [categorys, setCategorys] = useState<string[]>([])

  useEffect(() => {
    ApiHandler()
  }, [])
  const ApiHandler = async () => {
    await ProductApi.getAllCategory().then(res => {
      console.log(res.map(x => ({ value: x, label: x })))
      setCategorys(res)
    })
  }
  return categorys.map(x => ({ value: x, label: x }))
}
