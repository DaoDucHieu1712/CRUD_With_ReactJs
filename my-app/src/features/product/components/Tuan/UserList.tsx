import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Layout, notification, Modal, Input, Button, Form } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import UserApi from '../../../../api/Tuan/UserApi'
import { User } from '../../../../models/User'

const { Meta } = Card
const { Content } = Layout
interface UserListProps {
  users: User[]
  onReload: () => void
}
const UserList = ({ users, onReload }: UserListProps) => {
  const [userList, setUserList] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    UserApi.getAll().then((response: User[]) => {
      setUserList(response)
      console.log(response)
    })
  }, [users])

  //Delete Cat
  const handleDelete = (id: number) => {
    UserApi.delete(id)
      .then(() => {
        const updatedUserList = userList.filter(user => user.id !== id)
        setUserList(updatedUserList)
        notification.success({
          message: 'Delete success',
          description: `User with ID ${id} has been deleted.`
        })
      })
      .catch(error => {
        console.error('Failed to delete user:', error)
        notification.error({
          message: 'Delete failed',
          description: `Failed to delete user with ID ${id}. Please try again later.`
        })
      })
  }

  // Update Cat

  const handleUpdate = (user: User) => {
    setSelectedUser(user)
    showModal()
  }

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue(selectedUser)
    }
  }, [selectedUser, form])

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setLoading(true)
    form
      .validateFields()
      .then((values: User) => {
        UserApi.update(selectedUser!.id, values)
          .then(() => {
            form.resetFields()
            setLoading(false)
            setVisible(false)
            notification.success({
              message: 'Update success',
              description: `Cat with ID ${selectedUser!.id} has been updated.`
            })
            onReload()
          })
          .catch(error => {
            console.error('Error updating cat:', error)
            setLoading(false)
          })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleCancel = () => {
    setSelectedUser(null)
    setVisible(false)
  }

  return (
    <>
      <Layout style={{ padding: '0 50px' }}>
        <Content style={{ margin: '16px 0' }}>
          <div style={{ padding: 24, minHeight: 280 }}>
            <Row gutter={[40, 32]}>
              {userList.map((user: User) => (
                <Col span={6} key={user.id}>
                  <Card
                    hoverable
                    cover={<img alt={user.username} height={250} src={user.avatar} />}
                    actions={[
                      <EditOutlined key="edit" onClick={() => handleUpdate(user)} />,
                      <DeleteOutlined key="delete" onClick={() => handleDelete(user.id)} />
                    ]}
                  >
                    <Row>
                      <Col span={30} offset={6}>
                        <Meta title={user.username} description={user.age} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </Layout>

      {/* Modal Update Cat */}
      <Modal visible={visible} title="Update User" onOk={handleOk} onCancel={handleCancel} confirmLoading={loading}>
        <Form form={form} layout="vertical" name="updateCatForm">
          <Form.Item name="username" label="UserName" rules={[{ required: true, message: 'Please enter the username' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please enter the user age' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Avatar"
            rules={[{ required: true, message: 'Please enter the user avatar URL' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserList
