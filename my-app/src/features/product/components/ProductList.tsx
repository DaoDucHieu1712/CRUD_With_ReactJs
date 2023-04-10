import useProductList from '../../../hooks/product/useProductList'
import { Product } from '../../../models/Product'

const ProductList = () => {
  const { products, loading, error } = useProductList()
  return (
    <>
      {loading ? (
        <p>Loading .... </p>
      ) : (
        products.map((item: Product) => {
          return <p key={item.id}>{item.title}</p>
        })
      )}
    </>
  )
}

export default ProductList
