import useProductList from '../../../hooks/hieu/product/useProductList'
import { Product } from '../../../models/Product'
import ProductItem from './ProductItem'
import { Spin } from 'antd'

const ProductList = () => {
  const { products, loading, error } = useProductList()

  return (
    <>
      <div className="grid-container wide">
        <div className="row">
          {loading ? (
            <Spin />
          ) : (
            products.map((item: Product) => (
              <ProductItem key={item.id} id={item.id} images={item.thumbnail} title={item.title} price={item.price} />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default ProductList
