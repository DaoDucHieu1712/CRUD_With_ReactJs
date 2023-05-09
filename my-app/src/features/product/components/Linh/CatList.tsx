import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Layout, notification, Modal, Input, Button, Form } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CatApi from '../../../../api/Linh/CatApi'
import { Cat } from '../../../../models/Cat'

const { Meta } = Card
const { Content } = Layout
interface CatListProps {
  cats: Cat[]
  onReload: () => void
}
const CatList = ({ cats, onReload }: CatListProps) => {
  const [catList, setCatList] = useState<Cat[]>([])
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null)

  useEffect(() => {
    CatApi.getAll().then((response: Cat[]) => {
      setCatList(response)
      console.log(response)
    })
  }, [cats])

  //Delete Cat
  const handleDelete = (id: number) => {
    CatApi.delete(id)
      .then(() => {
        const updatedCatList = catList.filter(cat => cat.id !== id)
        setCatList(updatedCatList)
        notification.success({
          message: 'Delete success',
          description: `Cat with ID ${id} has been deleted.`
        })
      })
      .catch(error => {
        console.error('Failed to delete cat:', error)
        notification.error({
          message: 'Delete failed',
          description: `Failed to delete cat with ID ${id}. Please try again later.`
        })
      })
  }

  // Update Cat

  const handleUpdate = (cat: Cat) => {
    setSelectedCat(cat)
    showModal()
  }

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (selectedCat) {
      form.setFieldsValue(selectedCat)
    }
  }, [selectedCat, form])

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setLoading(true)
    form
      .validateFields()
      .then((values: Cat) => {
        CatApi.update(selectedCat!.id, values)
          .then(() => {
            form.resetFields()
            setLoading(false)
            setVisible(false)
            notification.success({
              message: 'Update success',
              description: `Cat with ID ${selectedCat!.id} has been updated.`
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
    setSelectedCat(null)
    setVisible(false)
  }

  return (
    <>
      <Layout style={{ padding: '0 50px' }}>
        <Content style={{ margin: '16px 0' }}>
          <div style={{ padding: 24, minHeight: 280 }}>
            <Row gutter={[40, 32]}>
              {catList.map((cat: Cat) => (
                <Col span={6} key={cat.id}>
                  <Card
                    hoverable
                    cover={<img alt={cat.name} height={250} src={cat.avatar} />}
                    actions={[
                      <EditOutlined key="edit" onClick={() => handleUpdate(cat)} />,
                      <DeleteOutlined key="delete" onClick={() => handleDelete(cat.id)} />
                    ]}
                  >
                    <Row>
                      <Col span={30} offset={6}>
                        <Meta title={cat.name} description={cat.price} />
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
      <Modal visible={visible} title="Update Cat" onOk={handleOk} onCancel={handleCancel} confirmLoading={loading}>
        <Form form={form} layout="vertical" name="updateCatForm">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the cat name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the cat price' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="origin" label="Origin" rules={[{ required: true, message: 'Please enter the cat origin' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Avatar"
            rules={[{ required: true, message: 'Please enter the cat avatar URL' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CatList
