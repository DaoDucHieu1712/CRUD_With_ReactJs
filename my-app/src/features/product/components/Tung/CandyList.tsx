import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Layout, notification, Modal, Input, Button, Form } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CandyApi from '../../../../api/Tung/CandyApi'
import { Candy } from '../../../../models/Candy'

const { Meta } = Card
const { Content } = Layout
interface CandyListProps {
  candys: Candy[]
  onReload: () => void
}
const CandyList = ({ candys, onReload }: CandyListProps) => {
  const [candyList, setCandyList] = useState<Candy[]>([])
  const [selectedCandy, setSelectedCandy] = useState<Candy | null>(null)

  useEffect(() => {
    CandyApi.getAll().then((response: Candy[]) => {
      setCandyList(response)
      console.log(response)
    })
  }, [candys])

  // Delete 
  const handleDelete = (id: number) => {
    CandyApi.deleteCandy(id)
      .then(() => {
        const updatedCandyList = candyList.filter((candy) => candy.id !== id)
        setCandyList(updatedCandyList)
        notification.success({
          message: 'Delete success',
          description: `Candy with ID ${id} has been deleted.`
        })
      })
      .catch((error) => {
        console.error('Failed to delete candy:', error)
        notification.error({
          message: 'Delete failed',
          description: `Failed to delete candy with ID ${id}. Please try again later.`
        })
      })
  };

  // Update Cat
  const handleUpdate = (candy: Candy) => {
    setSelectedCandy(candy)
    showModal()
  }

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (selectedCandy) {
      form.setFieldsValue(selectedCandy)
    }
  }, [selectedCandy, form])

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setLoading(true)
    form
      .validateFields()
      .then((values: Candy) => {
        CandyApi.update(selectedCandy!.id, values)
          .then(() => {
            form.resetFields()
            setLoading(false)
            setVisible(false)
            notification.success({
              message: 'Update success',
              description: `Candy with ID ${selectedCandy!.id} has been updated.`
            })
            onReload()
          })
          .catch(error => {
            console.error('Error updating candy:', error)
            setLoading(false)
          })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleCancel = () => {
    setSelectedCandy(null)
    setVisible(false)
  }

  return (
    <>
      <Layout style={{ padding: '0 50px' }}>
        <Content style={{ margin: '16px 0' }}>
          <div style={{ padding: 24, minHeight: 280 }}>
            <Row gutter={[40, 32]}>
              {candyList.map((candy: Candy) => (
                <Col span={6} key={candy.id}>
                  <Card
                    hoverable
                    cover={<img alt={candy.name} height={250} />}
                    actions={[
                      <EditOutlined key="edit" onClick={() => handleUpdate(candy)} />,
                      <DeleteOutlined key="delete" onClick={() => handleDelete(candy.id)} />
                    ]}
                  >
                    <Row>
                      <Col span={30} offset={6}>
                        <Meta title={candy.name} description={candy.price} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </Layout>

      {/* Modal Update Candy */}
      <Modal visible={visible} title="Update Candy" onOk={handleOk} onCancel={handleCancel} confirmLoading={loading}>
        <Form form={form} layout="vertical" name="updateCatForm">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the candy name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the candy price' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the candy description' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CandyList