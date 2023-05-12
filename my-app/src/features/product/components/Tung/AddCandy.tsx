import React, { useState } from 'react'
import { Form, Input, notification, Button, Modal } from 'antd'
import CandyApi from '../../../../api/Tung/CandyApi'
import { Candy } from '../../../../models/Candy'
import { toast } from 'react-toastify'

interface Props {
  onLoad: () => void
}

function AddCandy  (props : Props) {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
  
    const [form] = Form.useForm()
  
    const showModal = () => {
      setVisible(true)
    };
    const handleOk = () => {
        setLoading(true)
        form.validateFields()
          .then((values: Candy) => {
            CandyApi.createCandy(values)
              .then(() => {
                form.resetFields()
                setLoading(false)
                setVisible(false)
                toast.success('Candy added successfully')
                props.onLoad()
              })
              .catch((error) => {
                console.error('Error creating candy:', error)
                setLoading(false)
              })
          })
          .catch(() => {
            setLoading(false)
          })
      }
      
  
    const handleCancel = () => {
      setVisible(false);
    };
  
    return (
      <>
        <Button  type="default" onClick={showModal}>
          Add new Candy
        </Button>
        <Modal
          visible={visible}
          title="Add new Candy"
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <Form form={form} layout="vertical" name="addCandyForm">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the candy name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter the candy description' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter the candy price' }]}
            >
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }
  

export default AddCandy