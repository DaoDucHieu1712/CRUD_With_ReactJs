import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Form, Button, DatePicker, Input, Select, Spin } from 'antd'
import { useEffect, useState } from 'react'

import customParseFormat from 'dayjs/plugin/customParseFormat'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import useStudent from '../../../../hooks/hieu/student/useStudent'
import { Department } from '../../../../models/Department'
import DepartmentApi from '../../../../api/Hieu/DepartmentApi'
import StudentApi from '../../../../api/Hieu/StudentApi'

dayjs.extend(customParseFormat)
const UpdateStudentStyle = styled.div`
  width: 700px;
  margin: 0 auto;
  .form {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`

const UpdateStudent = () => {
  const navigate = useNavigate()
  const { loading, student } = useStudent()
  const [depts, setDepts] = useState<Department[]>([])
  const { id } = useParams()
  useEffect(() => {
    apiHandler()
    console.log(student)
  }, [])

  const apiHandler = async () => {
    await DepartmentApi.getAll().then(res => {
      console.log(res)
      setDepts(res)
    })
  }

  const onSubmitHandler = async (values: any) => {
    await StudentApi.update(id, values).then(() => {
      toast.success('Update Student successful !!')
      navigate('/student')
    })
  }
  return (
    <UpdateStudentStyle>
      <h2>Update Student</h2>
      {loading ? (
        <Spin />
      ) : (
        <div className="form">
          <Form autoComplete="off" onFinish={onSubmitHandler} wrapperCol={{ span: 32 }}>
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Please enter your first name'
                },
                { whitespace: true },
                { min: 1 }
              ]}
              initialValue={student?.firstName}
              hasFeedback
            >
              <Input size="large" placeholder="Type first name ..." />
            </Form.Item>

            <Form.Item
              name="middleName"
              rules={[
                {
                  required: true,
                  message: 'Please enter your middle name'
                },
                { whitespace: true },
                { min: 3 }
              ]}
              initialValue={student?.middleName}
              hasFeedback
            >
              <Input size="large" placeholder="Type middle name ..." />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: 'Please enter your last name'
                },
                { whitespace: true },
                { min: 3 }
              ]}
              initialValue={student?.lastName}
              hasFeedback
            >
              <Input size="large" placeholder="Type last name ..." />
            </Form.Item>

            <Form.Item
              name="gender"
              rules={[{ required: true, message: 'please select gender !!!' }]}
              initialValue={student?.gender}
            >
              <Select size="large" placeholder="Select your gender">
                <Select.Option value={true}>Male</Select.Option>
                <Select.Option value={false}>Female</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dayOfBirth"
              rules={[
                {
                  required: true,
                  message: 'Please provide your date of birth'
                }
              ]}
              initialValue={dayjs(student?.dayOfBirth.toString(), 'YYYY-MM-DD')}
              hasFeedback
            >
              <DatePicker size="large" style={{ width: '100%' }} picker="date" placeholder="Chose date of birth" />
            </Form.Item>

            <Form.Item
              name="departmentId"
              rules={[{ required: true, message: 'please select department !!' }]}
              initialValue={student?.department.id}
            >
              <Select size="large" placeholder="Select your department">
                {depts.map((item: Department) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button size="large" block type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </UpdateStudentStyle>
  )
}

export default UpdateStudent
