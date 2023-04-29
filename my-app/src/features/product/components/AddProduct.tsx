import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { useState } from 'react'
import useCategoryList from '../../../hooks/hieu/product/useCategoryList'
import ProductApi from '../../../api/Hieu/ProductApi'
import { toast } from 'react-toastify'
import { Product } from '../../../models/Product'
import { title } from 'process'

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const c = useCategoryList()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  const handleOk = async () => {
    //handle logic code
    const _product = form.getFieldsValue()
    const NewProduct: Product = {
      ..._product,
      stock: 0,
      discountPercentage: 0,
      rating: 0,
      images: ['test1', 'test2', 'test3', 'test4']
    }
    await ProductApi.addProduct(NewProduct)
      .then(res => {
        toast.success(`Add ${res.title} successful !! `)
      })
      .catch(() => {
        toast.error('Add product failed !!')
      })
    console.log(NewProduct)
    form.resetFields()
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="grid-container wide">
        <div className="abc">
          <Button type="default" onClick={showModal}>
            Add new Product
          </Button>
        </div>
      </div>
      <Modal title="Add new Product" width={600} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item label="ID" name="id" required rules={[{ required: true, message: 'ID not required ' }]}>
            <Input type="number" placeholder="enter the title" size="large"></Input>
          </Form.Item>
          <Form.Item label="Title" name="title" required rules={[{ required: true, message: 'Title not required ' }]}>
            <Input placeholder="enter the title" size="large"></Input>
          </Form.Item>
          <Form.Item
            label="Thumbnail"
            name="thumbnail"
            required
            rules={[{ required: true, message: 'thumbnail not required ' }]}
          >
            <Input placeholder="enter the url thumbnail" size="large"></Input>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="enter the description" size="large"></Input.TextArea>
          </Form.Item>
          <Form.Item label="Brand" name="brand">
            <Input placeholder="enter the brand" size="large"></Input>
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber size="large" min={1} />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select defaultValue="smartphones" options={c} size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddProduct
