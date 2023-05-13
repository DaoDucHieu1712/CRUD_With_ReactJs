import React, { useState } from 'react'
import { Form, Input,notification, Button, Modal } from 'antd'
import UserApi from '../../../../api/Tuan/UserApi'
import { User } from '../../../../models/User'
import { toast } from 'react-toastify'

interface Props {
  onLoad: () => void
}

function AddUser(props: Props) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const showModal = () => {
    setVisible(true)
  }
  const handleOk = () => {
    setLoading(true)
    form
      .validateFields()
      .then((values: User) => {
        UserApi.add(values)
          .then(() => {
            form.resetFields()
            setLoading(false)
            setVisible(false)
            notification.success({
              message: 'Add new user success'          
            });
            props.onLoad() // call onLoad prop here
          })
          .catch(error => {
            console.error('Error creating user:', error)
            setLoading(false)
          })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Button type="default" onClick={showModal}>
        Add New User
      </Button>
      <Modal visible={visible} title="Add New User" onOk={handleOk} onCancel={handleCancel} confirmLoading={loading}>
        <Form form={form} layout="vertical" name="addUserForm">
          <Form.Item name="username" label="UserName" rules={[{ required: true, message: 'Please enter the user name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please enter the user age' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="avatar" label="Avatar" rules={[{ required: true, message: 'Please enter the user avatar' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddUser
