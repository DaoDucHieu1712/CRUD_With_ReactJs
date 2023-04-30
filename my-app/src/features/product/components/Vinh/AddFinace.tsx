import React, { useState } from 'react'
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, TreeSelect } from 'antd'
import styled from 'styled-components'
import { useForm } from 'antd/lib/form/Form'

const StyledButton = styled.div`
  text-align: center;
`

const AddFinace = () => {
  const [finace, SetFinance] = useState({})
  const [form] = useForm()

  const dateFormat = 'DD/MM/YYYY'

  const handleSubmit = () => {
    const formData = form.getFieldsValue()
    formData.createdAt = formData.createdAt.format(dateFormat)
    console.log(formData)
  }

  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600 }}>
      <Form.Item label="Type" name="type">
        <Select>
          <Select.Option value="Food">Food</Select.Option>
          <Select.Option value="Travel">Travel</Select.Option>
          <Select.Option value="Entertaiment">Entertaiment</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>
      <Form.Item label="Date" name="createdAt">
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber />
      </Form.Item>
      <StyledButton>
        <Button onClick={handleSubmit}>Add</Button>
      </StyledButton>
    </Form>
  )
}

export default AddFinace
