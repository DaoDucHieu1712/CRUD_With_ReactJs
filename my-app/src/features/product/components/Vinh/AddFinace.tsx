import React, { useState } from 'react';
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, TreeSelect } from 'antd';
import styled from 'styled-components';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/es/input/TextArea';
import FinanceApi from '../../../../api/Vinh/FinanceApi';
import { Finance } from '../../../../models/Finance';
import { error } from 'console';
import { toast } from 'react-toastify';

const StyledButton = styled.div`
  text-align: center;
`;

const AddFinace = () => {
  const [finace, SetFinance] = useState({});
  const [form] = useForm();

  const defaultValues = {
    createdAt: new Date(),
    description: '',
    price: 1,
    type: 'Food'
  };
  const dateFormat = 'DD/MM/YYYY';

  const handleSubmit = () => {
    const formData = form.getFieldsValue();
    formData.createdAt = formData.createdAt.format(dateFormat);
    console.log(formData);
    FinanceApi.createFinance(formData)
      .then((res: Finance) => {
        toast.success('Success');
      })
      .catch((error: any) => {
        toast.error('Have Error');
      });
  };

  return (
    <Form onFinish={handleSubmit} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">
      <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Type is required' }]}>
        <Select>
          <Select.Option value="Food">Food</Select.Option>
          <Select.Option value="Travel">Travel</Select.Option>
          <Select.Option value="Entertaiment">Entertaiment</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea defaultValue={'111'} />
      </Form.Item>
      <Form.Item label="Date" name="createdAt" rules={[{ required: true, message: 'Date is required' }]}>
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber min={0} />
      </Form.Item>
      <StyledButton>
        <Button htmlType="submit">Add</Button>
      </StyledButton>
    </Form>
  );
};

export default AddFinace;
