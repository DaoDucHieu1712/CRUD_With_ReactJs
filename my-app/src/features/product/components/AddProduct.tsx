import React, { useState } from 'react'
import { Form, Button, Modal, Input, InputNumber, Select } from 'antd'
import useCategoryList from '../../../hooks/product/useCategoryList'
import { Product } from '../../../models/Product'

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

  const handleOk = () => {
    //handle logic code
    const _product = form.getFieldsValue()
    const NewProduct = { ..._product, stock: 0, discountPercentage: 0, rating: 0 }
    console.log(NewProduct)
    form.resetFields()
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="grid-container wide">
        <div className="abc">
          <Button type="primary" onClick={showModal}>
            Add new Product
          </Button>
        </div>
      </div>
      <Modal title="Add new Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item label="Title" name="title" required rules={[{ required: true, message: 'Title not required ' }]}>
            <Input placeholder="enter the title" size="large"></Input>
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
