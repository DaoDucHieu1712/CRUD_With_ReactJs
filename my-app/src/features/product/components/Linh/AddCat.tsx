import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Modal } from 'antd';
import CatApi from '../../../../api/Linh/CatApi';
import { Cat } from '../../../../models/Cat';
import { toast } from 'react-toastify';

interface Props {
  onLoad: () => void;
}

function AddCat  (props : Props) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const [form] = Form.useForm();
  
    const showModal = () => {
      setVisible(true);
    };
    const handleOk = () => {
        setLoading(true);
        form.validateFields()
          .then((values: Cat) => {
            CatApi.add(values)
              .then(() => {
                form.resetFields();
                setLoading(false);
                setVisible(false);
                toast.success('Cat added successfully');
                props.onLoad(); // call onLoad prop here
              })
              .catch((error) => {
                console.error('Error creating cat:', error);
                setLoading(false);
              });
          })
          .catch(() => {
            setLoading(false);
          });
      };
      
  
    const handleCancel = () => {
      setVisible(false);
    };
  
    return (
      <>
        <Button  type="default" onClick={showModal}>
          Add new Cat
        </Button>
        <Modal
          visible={visible}
          title="Add new Cat"
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <Form form={form} layout="vertical" name="addCatForm">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the cat name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter the cat price' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="origin"
              label="Origin"
              rules={[{ required: true, message: 'Please enter the cat origin' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="avatar"
              label="Avatar"
              rules={[{ required: true, message: 'Please enter the cat avatar' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
  

export default AddCat;