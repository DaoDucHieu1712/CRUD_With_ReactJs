import useProductList from '../../../hooks/product/useProductList'
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
              <ProductItem key={item.id} id={item.id} images={item.images} title={item.title} price={item.price} />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default ProductList
