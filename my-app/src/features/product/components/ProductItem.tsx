import { Button, Space } from 'antd'
import styled from 'styled-components'

interface ProductItemProps {
  id: number
  images: string[]
  title: string
  price: number
}
const ProductItemStyle = styled.div`
  .product {
    &-item {
      padding: 15px;
      border: 1px solid #eee;
      height: 500px;
      margin: 12px 0;
    }

    &-image {
      height: 300px;
      img {
        height: 300px;
      }
      margin-bottom: 15px;
    }
    &-title {
      text-align: center;
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &-price {
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 10px;
      color: red;
    }
    &-action {
      margin-top: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0 35px;
    }
  }
`

const ProductItem = ({ id, images, title, price }: ProductItemProps) => {
  return (
    <div className="col pc-3">
      <ProductItemStyle>
        <div className="product-item">
          <div className="product-image">
            <img src={images[0]} alt="" />
          </div>
          <div className="product-info">
            <p className="product-title">{title}</p>
            <p className="product-price">{price} $</p>
          </div>
          <div className="product-action">
            <Space wrap>
              <Button type="primary">Edit</Button>
              <Button type="primary" danger>
                Delete
              </Button>
            </Space>
          </div>
        </div>
      </ProductItemStyle>
    </div>
  )
}

export default ProductItem
